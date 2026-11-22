export default function Loading() {
  return (
    <div className="container loading-state" role="status">
      <div className="skeleton" />
      <p>Preparing the collection…</p>
    </div>
  );
}
