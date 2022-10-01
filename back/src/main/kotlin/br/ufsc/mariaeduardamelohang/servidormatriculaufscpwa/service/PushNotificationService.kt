package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.service

import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.command.RegistrarSubscribeCommand
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model.SubscriptionRequest
import br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.util.AuthUtils
import com.google.firebase.messaging.FirebaseMessaging
import com.google.firebase.messaging.Message
import com.google.firebase.messaging.Notification
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.time.LocalDate.now

@Service
class PushNotificationService(
    private val logger : Logger = LoggerFactory.getLogger(PushNotificationService::class.java),
    private val registrarSubscribeCommand: RegistrarSubscribeCommand
) {
    fun sendNotification(title: String, body: String, subscriptionToken: String) {
        val notification = Notification.builder()
            .setTitle(title)
            .setBody(body)
            .build()

        val message = Message.builder()
            .setToken(subscriptionToken)
            .setNotification(notification)
            .putData("horario", now().toString())
            .build()

        val firebaseMessaging = FirebaseMessaging.getInstance()
        val response = firebaseMessaging.send(message)
        logger.info("Successfully sent message: $response")
    }

    fun subscribe(subscriptionRequest: SubscriptionRequest) {
        val aluno = AuthUtils.getAlunoAutenticado()
        if (aluno !== null) {
            registrarSubscribeCommand.execute(aluno.matricula, subscriptionRequest.token)
            sendNotification("Notificações habilitadas com sucesso", "Teste", subscriptionRequest.token)
        }
    }
}