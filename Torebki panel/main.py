import sys
from PySide6.QtWidgets import QApplication, QMainWindow, QTableWidgetItem
from UiFiles.ui import Ui_MainWindow
from UiFiles.managementUi import Ui_Form
from db_wrapper import Database
from management import ManagementWindow
from newsletter import NewsletterWindow
from PySide6.QtGui import QIcon

database = Database()

class MainWindow(QMainWindow, Ui_MainWindow):
    def __init__(self):
        super().__init__()
        self.setupUi(self)  # Inicjalizacja interfejsu
        self.setWindowTitle("Panel administracyjny")
        self.setup_connections()  # Podłączamy funkcje do przycisków
        self.result = []
        self.current_table = "newsletter_subscribers"  # Zmienna instancji zamiast globalnej
        self.unEditedResult = []
        self.columnCount = 0
        self.management_window = None 
        self.newsletter_window = None

    def updateTable(self):
            self.tableWidget.setColumnCount(self.columnCount)
            self.tableWidget.setRowCount(len(self.result))
            self.tableWidget.setHorizontalHeaderLabels(self.headers) 
            self.tableWidget.clearContents()

            for i, row in enumerate(self.result):
                for j, value in enumerate(row):
                    self.tableWidget.setItem(i, j, QTableWidgetItem(str(value)))


    def setup_connections(self):
        self.pushButton.clicked.connect(self.on_newsletter_clicked)
        self.pushButton_2.clicked.connect(self.on_orders_clicked)
        self.pushButton_3.clicked.connect(self.on_managment_clicked)
        self.pushButton_4.clicked.connect(self.on_products_clicked)
        self.pushButton_5.clicked.connect(self.on_mail_clicked)

    def on_newsletter_clicked(self):
        self.current_table = "newsletter_subscribers"  
        self.result =  database.execute_query(f"SELECT * FROM {self.current_table}")  # Poprawione użycie zmiennej
        self.originalResult = self.result
        if not self.result:  # Jeśli nie ma wyników
            print("Brak danych do wyświetlenia")
            return

        self.columnCount = 3
        self.headers = ["ID", "Email", "Data dodania"]
        self.tableWidget.setColumnCount(self.columnCount)
        self.updateTable()


    def on_orders_clicked(self):
        print("Zamówienia button clicked!")
        self.current_table = "Orders"  # Teraz poprawnie zmieniamy tabelę

    def on_products_clicked(self):
        try:
            self.current_table = "products"
            self.result=database.execute_query(f"SELECT * FROM {self.current_table}")
            self.originalResult = self.result
            self.columnCount=5
            self.headers = ["ID", "Opis", "Nazwa", "Cena", "Stan"]

            self.updateTable()
        except Exception as e:
            print(f"Error: {e}")


    def on_search(self):
        print("Search button clicked!")
        newResult = []
        key = self.lineEdit.text()
        if (key==""):
             self.result = self.originalResult
             self.updateTable()
             return
        for row in self.result:
            if key in str(row):  #
                newResult.append(row)
        self.result = newResult
        self.updateTable()
                

    def on_managment_clicked(self):
        if self.management_window is None or not self.management_window.isVisible():
            self.management_window = ManagementWindow()
            self.management_window.show()


    
    def on_mail_clicked(self):
        if self.newsletter_window is None or not self.newsletter_window.isVisible():
            self.newsletter_window = NewsletterWindow()
            self.newsletter_window.show()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setWindowIcon(QIcon("UiFiles/favicon.ico"))
    window = MainWindow()
    window.show()
    sys.exit(app.exec())
