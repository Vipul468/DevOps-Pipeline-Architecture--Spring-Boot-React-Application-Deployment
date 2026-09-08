import { useEffect, useState } from 'react'

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/employees')
      .then(r => {
        if (!r.ok) throw new Error('API request failed')
        return r.json()
      })
      .then(data => setEmployees(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="app">
      <header>
        <div>
          <h1>DevOps Employee Dashboard</h1>
          <p>Spring Boot + React + Docker + Jenkins + Kubernetes</p>
        </div>
        <span className="status">● LIVE</span>
      </header>

      <main>
        <div className="summary">
          <div className="metric">
            <span>Total Employees</span>
            <strong>{employees.length}</strong>
          </div>
          <div className="metric">
            <span>Backend</span>
            <strong>Spring Boot</strong>
          </div>
          <div className="metric">
            <span>Deployment</span>
            <strong>Kubernetes</strong>
          </div>
        </div>

        <h2>Employees</h2>

        {loading && <p>Loading employees...</p>}
        {error && <p className="error">Error: {error}</p>}

        <section className="grid">
          {employees.map(employee => (
            <article className="card" key={employee.id}>
              <div className="avatar">{employee.name.charAt(0)}</div>
              <h3>{employee.name}</h3>
              <p className="role">{employee.role}</p>
              <p>{employee.department}</p>
              <p>{employee.email}</p>
            </article>
          ))}
        </section>
      </main>

      <footer>
        CI/CD Demo • Jenkins → Docker Hub → Ansible → Kubernetes
      </footer>
    </div>
  )
}

export default App
