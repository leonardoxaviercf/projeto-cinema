function LoadingGrid({ count = 12 }) {
  return (
    <div className="grid" aria-label="Carregando conteúdo">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-poster" />
          <div className="skeleton-info">
            <span />
            <small />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingGrid;
