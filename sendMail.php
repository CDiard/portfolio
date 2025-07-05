<?php
header('Content-Type: text/plain; charset=utf-8');

// Configuration
$to = "contact@corentindiard.fr";

// Récupération et nettoyage des données
$from = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$firstname = htmlspecialchars(trim($_POST['firstname'] ?? ''));
$lastname = htmlspecialchars(trim($_POST['lastname'] ?? ''));
$subject = htmlspecialchars(trim($_POST['subject'] ?? ''));
$message = htmlspecialchars(trim($_POST['message'] ?? ''));

// Vérifications de base
if (!$from || empty($firstname) || empty($lastname) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo "Tous les champs sont requis et l'email doit être valide.";
    exit;
}


// Construction du message (version HTML)
$fullMessage = "
    <html lang=\"fr\">
        <body>
            <p><strong>Message de:</strong> {$firstname} {$lastname}</p>
            <p><strong>Email:</strong> {$from}</p>
            <p><strong>Sujet:</strong> {$subject}</p>
            <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
            <hr>
            <p>Message envoyé depuis le site <a href=\"https://corentindiard.fr/\" target=\"_blank\">corentindiard.fr</a></p>
        </body>
    </html>
";

// Entêtes
$headers = [
    "MIME-Version: 1.0",
    "Content-type: text/html; charset=utf-8",
    "X-Mailer: PHP/" . phpversion(),
    "From: \"Demande de contact\" <contact@corentindiard.fr>",
    "Reply-To: {$from}"
];

// Envoi
if (mail($to, $subject, $fullMessage, implode("\r\n", $headers))) {
    echo "Message envoyé avec succès !";
} else {
    http_response_code(500);
    echo "Erreur lors de l'envoi du message.";
}