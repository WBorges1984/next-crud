import firebase from "../config";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import Cliente from "@/core/cliente";

export default class ColecaoCliente implements ClienteRepositorio{

    #conversor = {
        toFirestore(cliente: Cliente){
            return{
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions) : Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }


    async salvar(cliente: Cliente): Promise<Cliente> {
        return this.#colecao()
    }

    async excluir(cliente: Cliente): Promise<void> {
        return this.#colecao().doc(cliente.id).delete()
    }

    async obterTodos(): Promise<Cliente[]> {
        return null
    }

    #colecao() {
        return firebase.firestore().collection('clientes')
                        .withConverter(this.#conversor)
    }

}