export default function HomePage() {
  return (
    <div className="reference-home">
      <iframe
        title="Mój profil — DoRobory.AI"
        src={`${import.meta.env.BASE_URL}landing-doroboty/konto.html#aplikacje`}
      />
    </div>
  );
}
