import styled from "@emotion/styled"

const ResultadoAPI = styled.div`
    color: white;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`
const Imagen = styled.img`
    display: block;
    width: 120px;
`

const Texto = styled.p`
    font-size: 15px;
    span{
        font-weight: 700;
    }
`

const Precio =  styled.p`
    font-size: 24px;
    span{
        font-weight: 700;
    }
`


const Resultado = ({resultado}) => {
    const {PRICE,HIGHDAY,LOWDAY,CHANGEPCT24HOUR,IMAGEURL,LASTUPDATE } = resultado
  return (
    <ResultadoAPI>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen Cripto" />

        <div>
            <Precio>El Precio es de : <span>{PRICE}</span></Precio>
            <Texto>El Precio más alto del día es de : <span>{HIGHDAY}</span></Texto>
            <Texto>El Precio más bajo del día es de : <span>{LOWDAY}</span></Texto>
            <Texto>Variación Ultimas 24 HR : <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Últimas Actualizacón : <span>{LASTUPDATE}</span></Texto>
        </div>

    </ResultadoAPI>
  )
}

export default Resultado