# main.py

import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import config  # Import the config file

def send_email(receiver_email, quiz_result):
    # Gmail SMTP server setup
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = config.EMAIL_ADDRESS
    app_password = config.APP_PASSWORD

    # Create the email headers
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = "Your Quiz Result!"

    # Create the email body with the quiz result
    body = f"Hi! Here are the answers you submitted:\n\n{quiz_result}"
    message.attach(MIMEText(body, "plain"))

    try:
        # Connect to the Gmail SMTP server and send email
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()  # Enable encryption
        server.login(sender_email, app_password)
        server.sendmail(sender_email, receiver_email, message.as_string())
        server.quit()

        print("Email sent successfully!")

    except Exception as e:
        print(f"An error occurred: {e}")

# Example usage
quiz_result = "1. Question 1: Answer A\n2. Question 2: Answer B"
send_email("crush-email@example.com", quiz_result)
