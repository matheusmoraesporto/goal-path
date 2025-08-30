import './styles.css';

export default function Home() {
  return (
    <div className="roadmap-list-container centered-div">
      <h2>Road map list</h2>
      <ul className="roadmap-list">
        <li>Next.js 14</li>
        <li>React 19</li>
        <li>TypeScript 5.2</li>
      </ul>
    </div>
  );
}
