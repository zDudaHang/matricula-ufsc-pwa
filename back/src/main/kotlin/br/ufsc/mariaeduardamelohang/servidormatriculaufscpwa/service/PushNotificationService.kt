package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.notificacoes.RegistrarSubscribeCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.notificacoes.RemoverSubscribeTokenCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.input.SubscriptionInput
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.util.AuthUtils
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.Message
import com.google.firebase.messaging.Notification
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class PushNotificationService(
    private val registrarSubscribeCommand: RegistrarSubscribeCommand,
    private val removerSubscribeTokenCommand: RemoverSubscribeTokenCommand
) {

    private val logger: Logger = LoggerFactory.getLogger(PushNotificationService::class.java)

    private val BODY_PERDA_VAGA = "Edite o seu pedido de matrícula caso queira trocar de turma."

    fun notifyPerdaVaga(subscriptionToken: String, codigoTurma: String) {
        val title = "Vaga perdida na turma $codigoTurma"
        sendNotification(title, BODY_PERDA_VAGA, subscriptionToken)
    }

    fun notifyGanhoVaga(subscriptionToken: String, codigoTurma: String) {
        val title = "Saída na fila de espera da turma $codigoTurma"
        sendNotification(title, subscriptionToken = subscriptionToken)
    }

    fun sendNotification(title: String, body: String? = null, subscriptionToken: String) {
        logger.debug("Sending notification to $subscriptionToken")
        val notification = Notification.builder()
            .setTitle(title)
            .setBody(body)
            .build()

        val message = Message.builder()
            .setToken(subscriptionToken)
            .setNotification(notification)
            .build()

        val firebaseMessaging = FirebaseMessaging.getInstance()
        val response = firebaseMessaging.send(message)
        logger.debug("Successfully sent message: $response")
    }

    fun subscribe(subscriptionInput: SubscriptionInput) {
        val aluno = AuthUtils.getAlunoAutenticado()
        if (aluno !== null) {
            registrarSubscribeCommand.execute(aluno.matricula, subscriptionInput.token)
            sendNotification("Notificações habilitadas com sucesso", subscriptionToken = subscriptionInput.token)
        }
    }

    fun unsubscribe() {
        val aluno = AuthUtils.getAlunoAutenticado()
        if (aluno !== null) {
            removerSubscribeTokenCommand.execute(aluno.matricula)
        }
    }
}