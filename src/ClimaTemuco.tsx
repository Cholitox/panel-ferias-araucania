
import { useEffect, useState } from "react";
import "./Clima.css";

interface Clima {
  temperature_2m: number;
  relative_humidity_2m: number;
  weather_code: number;
}

function obtenerDescripcion(codigo: number): string {
  if (codigo === 0) return "Despejado";
  if (codigo === 1) return "Mayormente despejado";
  if (codigo === 2) return "Parcialmente nublado";
  if (codigo === 3) return "Nublado";
  if (codigo === 45 || codigo === 48) return "Niebla";
  if ([51, 53, 55, 56, 57].includes(codigo)) return "Llovizna";
  if ([61, 63, 65, 66, 67].includes(codigo)) return "Lluvia";
  if ([71, 73, 75, 77].includes(codigo)) return "Nieve";
  if ([80, 81, 82].includes(codigo)) return "Chubascos";
  if ([85, 86].includes(codigo)) return "Nevadas";
  if ([95, 96, 99].includes(codigo)) return "Tormenta";

  return "Condición desconocida";
}

function ClimaComuna() {
  const [clima, setClima] = useState<Clima | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-38.7396&longitude=-72.5984&current=temperature_2m,relative_humidity_2m,weather_code&timezone=America%2FSantiago"
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
        setError("Error al cargar el clima de Temuco");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando clima de Temuco...</p>;
  if (error) return <p>{error}</p>;
  if (!clima) return <p>No hay datos disponibles</p>;

  return (
    <section className="clima-card">
      <h2>Clima de Temuco</h2>
      <p>Temperatura: {clima.temperature_2m} °C</p>
      <p>Humedad: {clima.relative_humidity_2m} %</p>
      <p>Estado: {obtenerDescripcion(clima.weather_code)}</p>
    </section>
  );
}

export default ClimaComuna;
