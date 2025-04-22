from UiFiles.managementUi import Ui_Form
from db_wrapper import Database
from PySide6.QtWidgets import QWidget
from PySide6.QtWidgets import QMessageBox
from PySide6.QtWidgets import QFileDialog, QComboBox
from PySide6.QtCore import QCoreApplication
from PySide6.QtGui import QIcon

from db_wrapper import Database
from dotenv import load_dotenv
import os
load_dotenv()
import requests
database=Database()
SERVER_URL=os.getenv("SERVER_URL")


    


class ManagementWindow(QWidget, Ui_Form):
    def __init__(self):
        super().__init__()
        self.setupUi(self)  # Załadowanie interfejsu
        self.setup_connections()  # Podłączenie logiki
        self.setWindowTitle("Edycja produktu")
        self.file_paths=[]
        self.products = database.get_products()
        for i, product in enumerate(self.products):
            text = QCoreApplication.translate("Form", f"id: {product[0]}, nazwa: {product[2]}")
            self.EditSelect.addItem(text)

        #edit form inicjalizacja
        self.EditName.setVisible(False)
        self.EditPrice.setVisible(False)
        self.EditDesc.setVisible(False)
        self.EditStock.setVisible(False)
        self.EditSubmit.setVisible(False)
        self.label_9.setVisible(False)
        self.label_10.setVisible(False)
        self.label_11.setVisible(False)
        self.label_12.setVisible(False)
        self.currentEditProduct=None


    def setup_connections(self):
        self.DodawanieZatwierdz.clicked.connect(self.AddProductForm)
        self.DodawanieZdjecia.clicked.connect(self.AddProductImage)


        self.EditSubmit.clicked.connect(self.EditProductForm)
        self.EditSelect.currentIndexChanged.connect(self.HandleEditSelect)


#Dodawanie produktow

    def AddProductForm(self):
        try:
            nazwa=self.DodawanieNazwa.text()
            cena=self.DodawanieCena.text()
            opis=self.DodawanieOpis.text()
            stan=self.DodawanieStan.text()
            files=self.file_paths
            self.file_paths=[]
            self.label_6.setText(f"Wybrano 0 plików")
            


            #weryfikacja danych
            if nazwa=="" or cena=="" or opis=="" or stan=="": #dodać sprawdzanie czy sa zdjecia
                QMessageBox.warning(self, "Błąd", "Wszystkie pola muszą być wypełnione")
                return
  
            if not (isinstance(int(stan), int)):
                QMessageBox.warning(self, "Błąd", "Stan musi być liczbą całkowitą")
                return

            if int(stan)<0 or float(cena)<0:
                QMessageBox.warning(self, "Błąd", "Cena i stan nie mogą być ujemne")
                return
            if len(files) < 2 or len(files) > 4:
                QMessageBox.warning(self, "Błąd", "Wybierz od dwóch do czterech zdjęć")
                return


            #dodanie produktu do bazy danych
            newId=database.add_product(nazwa, cena, opis, stan)

            #zmiana nazwy pliku oraz dodanie plikow webp do arraya images

            def renameFile(path, index, newId):
                ext=path.split(".")[-1]
                new_fileName = f"p{newId}_{index}.{ext}"
                return new_fileName

            images=[]
            
            for i, path in enumerate(files):
                images.append(("files", (renameFile(path, i, newId), open(path, "rb")))) 
                
            response = requests.post(
                f"{SERVER_URL}/api/addProduct",
                data={"nazwa": nazwa, "cena": float(cena), "opis": opis, "stan": int(stan), "id": newId},
                files=images
            )
            
            #finalizacja
            
            for _, (_, file) in images:
                file.close()
           
            if response.status_code == 201:
                QMessageBox.information(self, "Sukces", "Dodano produkt")
                return
            elif response.status_code == 500:
                QMessageBox.warning(self, "Błąd", "Serwera")
                return


        except Exception as e:
            QMessageBox.warning(self, "Błąd zlapany", f"Wystąpił błąd: {e}")
            return
        


    def AddProductImage(self):
            self.file_paths = QFileDialog.getOpenFileNames(None, "Wybierz pliki", "", "Images (*.webp )" )[0]
            self.label_6.setText(f"Wybrano {len(self.file_paths)} plików")
            if not self.file_paths:
                return
            

    
    #Edytowanie produktow
    def HandleEditSelect(self): 
            self.EditSelect.model().item(0).setEnabled(False)
            self.EditName.setVisible(True)
            self.EditPrice.setVisible(True)
            self.EditDesc.setVisible(True)
            self.EditStock.setVisible(True)
            self.EditSubmit.setVisible(True)
            self.label_9.setVisible(True)
            self.label_10.setVisible(True)
            self.label_11.setVisible(True)
            self.label_12.setVisible(True)
            try:
                product_id = int(self.EditSelect.currentText().split(",")[0].split(":")[1])
                for product in self.products:
                    if product[0] == product_id:
                        self.currentEditProduct=product
                        self.EditName.setText(product[2])
                        self.EditPrice.setText(str(product[3]))
                        self.EditDesc.setText(product[1])
                        self.EditStock.setText(str(product[4]))
                        break
            except Exception as e:
                pass
            

            return


    def EditProductForm(self):
        try:
            #inicjalizacja
            nazwa=self.EditName.text()
            cena=self.EditPrice.text()
            opis=self.EditDesc.text()
            stan=self.EditStock.text()
            id=self.currentEditProduct

            #weryfikacja danych
            if nazwa=="" or cena=="" or opis=="" or stan=="": #dodać sprawdzanie czy sa zdjecia
                QMessageBox.warning(self, "Błąd", "Wszystkie pola muszą być wypełnione")
                return
  
            if not (isinstance(int(stan), int)):
                QMessageBox.warning(self, "Błąd", "Stan musi być liczbą całkowitą")
                return

            if int(stan)<0 or float(cena)<0:
                QMessageBox.warning(self, "Błąd", "Cena i stan nie mogą być ujemne")
                return

            #baza danych
            database.edit_product(str(nazwa), float(cena), str(opis), int(stan), int(id))
            QMessageBox.information(self, "Sukces", "Edytowano produkt")
        except Exception as e:
            QMessageBox.warning(self, "Błąd zlapany", f"Wystąpił błąd: {e}")
            return
          
