import React, {useState, useEffect} from 'react';

//
//  Services
//
import Api from './../../Services/Api';

//
//  Styles
//
import './style.css';

//
//  Search Component
//
export default function Search () {

    const [marcas, setMarcas] = useState([]);
    const [veiculos, setVeiculos] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [veiculo, setVeiculo] = useState({}); 

    //
    //  Carrega as marcas
    //
    useEffect(()=>{

        function listaMarcas () {
            Api.getMarcas().then(res=>{
                setMarcas(res.data);
            });
        }

        listaMarcas();

    },[])

    function listaVeiculos (marca) {
        Api.getVeiculos(marca).then(res=>{
            setVeiculos(res.data);
            setModelos([]);
            setVeiculo({});
        });
    }

    function listaModelos ( marcaModelo ){
        const [marca , modelo] = marcaModelo.split('|');
        Api.getModelos(marca, modelo).then(res=>{
            setModelos(res.data);
            setVeiculo({});
        })
    }

    function listaAnos ( marcaModeloAno ){
        const [marca , modelo, ano] = marcaModeloAno.split('|');
        Api.getVeiculo(marca, modelo, ano).then(res=>{
            setVeiculo(res.data);
        })
    }

    return(
        <div className="conteudo">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Quanto vale meu carro?</h1>
                    </div>
                </div>
                {marcas.length > 0 &&
                <div className="row">
                    <form>
                        <fieldset>
                            <legend>Quanto vale meu carro?</legend>
                            <div className="col-xs-12 col-sm-3">
                                <div className="formGroup">
                                    <label>Selecione a Marca</label>
                                    <div className="sSelect">
                                        <select onChange={e=>listaVeiculos(e.target.value)}>
                                            {marcas.map(marca=>(
                                                <option key={marca.id} value={marca.id}>{marca.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        
                            {veiculos.length > 0 &&
                            <div className="col-xs-12 col-sm-6">
                                <div className="formGroup">
                                    <label>Selecione o Modelo</label>
                                    <div className="sSelect">
                                        <select onChange={e=>listaModelos(e.target.value)}>
                                            {veiculos.map((veiculo,idx)=>(
                                                <option key={idx} value={veiculo.id_marca + '|' + veiculo.id_modelo }>{veiculo.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            }
                            
                            {modelos.length > 0 &&
                            <div className="col-xs-12 col-sm-3">
                                <div className="formGroup">
                                    <label>Selecione o Ano</label>
                                    <div className="sSelect">
                                        <select onChange={e=>listaAnos(e.target.value)}>
                                            {modelos.map((modelo,idx)=>(
                                                <option key={idx} value={modelo.id_marca + '|' + modelo.id_modelo + '|' + modelo.id_modelo_ano }>{modelo.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            }

                        </fieldset>
                    </form>
                </div>
                }
                
                { Object.keys(veiculo).length !== 0 &&
                <div className="row">
                    <div className="boxCarro">
                        <h2>Carro</h2>
                        <p>{veiculo.marca} {veiculo.modelo} - ano {veiculo.ano} - {veiculo.combustivel}</p>
                        <h2>Preço</h2>
                        <p>{veiculo.preco}</p>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}