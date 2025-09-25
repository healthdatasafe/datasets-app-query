import { useEffect, useState } from 'react'
import { searchMedications, type Medication } from './api'

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState<T>(value)
  useEffect(() => {
    const handle = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(handle)
  }, [value, delayMs])
  return debounced
}

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Medication[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<Medication | null>(null)

  const debouncedQuery = useDebouncedValue(query, 300)

  useEffect(() => {
    let cancelled = false
    async function run() {
      setError(null)
      setSelected(null)
      if (!debouncedQuery.trim()) {
        setResults([])
        return
      }
      setLoading(true)
      try {
        const data = await searchMedications(debouncedQuery)
        if (!cancelled) setResults(data)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  const hasResults = results.length > 0

  return (
    <div className="container">
      <h1>HDS - Search Medications</h1>
      <input
        className="searchInput"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {loading && <div className="status">Searching…</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && hasResults && (
        <ul className="results">
          {results.map((item) => (
            <li key={item.code}>
              <button className="resultItem" onClick={() => setSelected(item)}>
                <span className="resultTitle">{item.description.en}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && !hasResults && debouncedQuery.trim() && (
        <div className="status">No results</div>
      )}

      {selected && (
        <><div className="detail">
            <h2>{selected.label.en}</h2>
            <table>
                <tr>
                    <td className="detail-label">Description</td>
                    <td>{selected.description.en}</td>
                </tr>
                <tr>
                    <td>System / Code</td>
                    <td>{selected.system} / {selected.code}</td>
                </tr>
            </table>
            <button className="closeBtn" onClick={() => setSelected(null)}>Close</button>
        </div></>
      )}
    </div>
  )
}


