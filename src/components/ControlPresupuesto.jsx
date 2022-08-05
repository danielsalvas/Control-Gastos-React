import { formatearCantidad } from "../helpers";
import {useState, useEffect} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'


const ControlPresupuesto = ({gastos, presupuesto, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
      const totalDisponible = presupuesto - totalGastado;

      //Calcular el porcentaje gastado

      const nuevoPorcentaje = ( ((totalGastado/presupuesto) *100).toFixed(1) )


        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

        setGastado(totalGastado)
        setDisponible(totalDisponible)

    }, [gastos])

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');

        if (resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }
    

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar
                value={porcentaje}
                strokeWidth= {5}
                text={`${porcentaje}% Gastado`}
                background
                backgroundPadding={3}
                styles={buildStyles({
                backgroundColor: "#015a95",
                textColor: "#fff",
                pathColor: porcentaje > 100 ? 'red' : '#fff',
                trailColor: "transparent"
                
             })}
            />
        </div>

        <div className="contenido-presupuesto">
            <button 
                className="reset-app" 
                type="button"
                onClick={ e => handleResetApp()}
            >
                Reset App
            </button>
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado:</span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto;
