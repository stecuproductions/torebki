from UiFiles.managementUi import Ui_Form
from db_wrapper import Database
from dotenv import load_dotenv
from PySide6.QtWidgets import QWidget
from PySide6.QtWidgets import QMessageBox
from PySide6.QtWidgets import QFileDialog, QComboBox
from UiFiles.newsletterUi import Ui_Form
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
load_dotenv()
database=Database()




class NewsletterWindow(QWidget, Ui_Form):
    def __init__(self):
        super().__init__()
        self.setupUi(self)
        self.setup_connections()
        self.setWindowTitle("Newsletter")

    def setup_connections(self):
        self.pushButton_2.clicked.connect(self.on_send_clicked)

    def on_send_clicked(self):
        email = os.getenv("SMTP_EMAIL")
        password = os.getenv("SMTP_PASSWORD")
        smtp_server = os.getenv("SMTP_SERVER")
        port = os.getenv("SMTP_PORT")
        title = self.lineEdit.toPlainText()
        message = self.textEdit.toPlainText()
        if not title or not message:
            QMessageBox.critical(self, "Błąd", "Wypełnij wszystkie pola!")
            return

        result = database.get_mail_list()
        email_list = [email[0] for email in result]
        email_list = ["stecu03@gmail.com"] #tymczasowo
        msg = MIMEMultipart()
        msg['From'] = email
        msg['To'] = ', '.join(email_list)
        msg['Subject'] = title
        msg.attach(MIMEText(message, "html"))
        

        try:
            server = smtplib.SMTP(smtp_server, port)
            server.ehlo()  
            server.starttls()
            server.ehlo()  
            server.login(email, password)
            server.sendmail(email, email_list, msg.as_string())
            server.quit()
            QMessageBox.information(self, "Sukces", "Wiadomość została wysłana!")
        except Exception as e:
            server.quit()
            QMessageBox.critical(self, "Błąd", f"Wystąpił błąd: {e}")
