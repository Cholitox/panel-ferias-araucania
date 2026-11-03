
import { useEffect, useState } from "react";

interface Clima {
  temperature_2m: number;
  relative_humidity_2m: number;
}

function ClimaComuna() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-38.7396&longitude=-72.5984&current=temperature_2m,relative_humidity_2m&timezone=America%2FSantiago"
    )
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el clima");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setClima(datos.current);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar el clima");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando clima...</p>;
  if (error) return <p>{error}</p>;
  if (!clima) return <p>No hay datos disponibles</p>;

  return (
    <section>
      <h2>Clima de Temuco</h2>
      <p>Temperatura: {clima.temperature_2m} °C</p>
      <p>Humedad: {clima.relative_humidity_2m} %</p>
    </section>
  );
}

export default ClimaComuna;
