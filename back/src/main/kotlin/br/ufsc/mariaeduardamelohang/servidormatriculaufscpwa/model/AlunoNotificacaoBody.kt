package br.ufsc.mariaeduardamelohang.servidormatriculaufscpwa.model

data class AlunoNotificacaoBody(
    val message: String? = null,
    val type: NotificationTypeEnum
) {
    fun convertToNotificationData(): MutableMap<String, String?> {
        return mutableMapOf("message" to (message ?: ""), "type" to type.desc)
    }
}
