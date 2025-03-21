import garotoComLivros from '../../assets/Capa.jpeg'
import rede from '../../assets/Insentivo.png'
import leitura from '../../assets/Leitura.png'
import dedicacao from '../../assets/Dedicação.png'
import balanca from '../../assets/Balança.png'
import s from './inicio.module.scss'

export default function Inicio() {
    return (
        <main>
            <section className={s.secaoInicio}>
                <img src={garotoComLivros} alt="Imagem do pescoço pra baixo de um garoto segurando livros" />
                <h2>VENHA FAZER PARTE DA MAIOR REDE DE DOAÇÃO</h2>
            </section>

            <section className={s.insentivoEducacao}>
                <h2>Por que devo doar?</h2>

                <section className={s.destaque}>
                    <div>
                        <img src={rede} alt="Imagem ilustrativa representando grupo social" />
                        <p>Oferece livros a quem não tem acesso, ajudando a reduzir a exclusão social.</p>
                    </div>
                    <div>
                        <img src={leitura} alt="Imagem ilustrativa de pessoa lendo livro" />
                        <p>Estima o hábito da leitura e o aprendizado contínuo.</p>
                    </div>
                    <div>
                        <img src={dedicacao} alt="Imagem ilustrativa representando a união de pessoas" />
                        <p>Fornece conhecimento e inspiração, permitindo que indivíduos transformem suas vidas.</p>
                    </div>
                    <div>
                        <img src={balanca} alt="Imagem ilustrativa de uma balança" />
                        <p>Garante que todos, independentemente de sua condição, tenham oportunidades de aprendizado.</p>
                    </div>
                </section>
            </section>
        </main>
    )
}