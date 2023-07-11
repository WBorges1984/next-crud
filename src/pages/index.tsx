import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import Tabela from '@/components/Tabela'
import Cliente from '@/core/cliente'
import Botao from '@/components/Botao'
import Formulario from '@/components/Formulario'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())

  const clientes = [
    new Cliente('Ana', 66, '1' ),
    new Cliente('Ademir', 72, '2' ),
    new Cliente('Marcia', 65, '3' ),
    new Cliente('Debby', 37, '4' ),
    new Cliente('Willian', 39, '5' ),
    new Cliente('Lais', 23, '6' ),
  ]

function clienteSelecionado(cliente: Cliente){
  setCliente(cliente)
  setVisivel('form')
}

function clienteExcluido(cliente: Cliente){
  console.log(`Ecluir...  ${cliente.nome}`)
}

function novoCliente(){
  setCliente(Cliente.vazio())
  setVisivel('form')
}

function salvarCliente(cliente: Cliente){
  console.log(cliente)
  setVisivel('tabela')
}

  return (
    
    <main>
     <div className={` 
     flex justify-center items-center h-screen
     bg-gradient-to-r from-blue-500 to-purple-500
     text-white
     `}>
      <Layout titulo='Cadastro Simples'>
      {visivel === 'tabela' ? (
        <>
          <div className='flex justify-end'>
            <Botao onClick={novoCliente} className='mb-4'>Novo Cliente</Botao>
          </div>
        <Tabela clientes={clientes} 
            clienteSelecionado={clienteSelecionado}
            clienteExcluido={clienteExcluido}
          />
        </> 
      ) : (

        <Formulario cliente={cliente} 
          cancelado={()=> setVisivel('tabela')}
          clienteMudou={salvarCliente}
        />

      )}
      </Layout>
     </div>
    </main>
  )
}
