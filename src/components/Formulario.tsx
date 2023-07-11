import Cliente from "@/core/cliente";
import Entrada from "./Entrada";
import { useState } from "react";
import Botao from "./Botao";

interface FormularioProps{
    cliente:  Cliente
    clienteMudou?: (cliente: Cliente) => void
    cancelado?: () => void
}


export default function Formulario(props:FormularioProps){
    const id = props.cliente?.id
    const[nome, setNome] = useState(props.cliente?.nome ?? '')
    const[idade, setIdade] = useState(props.cliente?.idade ?? 0)

    return(
        <div>
            {id ? 
            (<Entrada 
                somenteLeitura
                    texto="Código" 
                    valor={id} 
                    className="mb-4"/>)
                    
            : false}

            <Entrada 
                texto="Nome" 
                tipo="text" 
                valor={nome} 
                valorMudou={setNome}
                className="mb-4"/>

            <Entrada    
            texto="Idade"   
            tipo="number"   
            valor={idade} 
            valorMudou={setIdade}/>
            <div className="flex justify-end mt-7">
                <Botao onClick={()=> props.clienteMudou?.(new Cliente(nome, +idade, id))} cor="blue" className="mr-2">
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>

        
    )
}