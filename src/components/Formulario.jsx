import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    border-radius: 5px;
    text-transform: uppercase;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`


const Formulario = ({setMonedas}) => {

    const monedas = [
        { id : 'USD', nombre : 'Dolar de Estado Unidos'},
        { id : 'MXN', nombre : 'Peso Mexicano'},
        { id : 'EUR', nombre : 'Euros'},
        { id : 'GBP', nombre : 'Libra'},
    ]

    const [ criptos , setCriptos ] = useState([])
    const[ error, setError ] = useState(false)

    //ArrayDestructuring , retorna SEGUN el indice OJO*
    const [ moneda,SelectMonedas ] = useSelectMonedas('Elige Tu Moneda', monedas)

    const [ criptomoneda,SelectCriptomonedas ] = useSelectMonedas('Elige Tu Criptomoneda', criptos)
    
    //API
    useEffect(  () => {

        const consultarAPI = async() => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map( cripto => {

                const objeto = {
                    id : cripto.CoinInfo.Name,
                    nombre : cripto.CoinInfo.FullName
                }
                return objeto
            })

            setCriptos(arrayCriptos)


        }

        consultarAPI()

    }, [])


    const handleSubmit = e  => {
        e.preventDefault();
        if([ moneda, criptomoneda].includes('') ){
            setError(true)
            return
        }else{
            //Si pasa la validacion
            setError(false)
            setMonedas({
                moneda,
                criptomoneda 
            })
        }

    }

  return (

    <>
        { error && <Error>Todos los Campos Son Obligatorios.</Error>  }
        <form
            onSubmit={ handleSubmit }
        >
            <SelectMonedas/>
            <SelectCriptomonedas/>
            <InputSubmit type='submit' value='Cotizar' />
        </form>
    </>
  )
}

export default Formulario