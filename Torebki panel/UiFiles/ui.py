# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'mainGBjIkO.ui'
##
## Created by: Qt User Interface Compiler version 6.8.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QRect, QSize, Qt)
from PySide6.QtGui import (QFont)
from PySide6.QtWidgets import (QAbstractItemView, QApplication, QComboBox, QFrame,
    QGridLayout, QHeaderView, QLineEdit, QMainWindow,
    QMenuBar, QPushButton, QSizePolicy, QSpacerItem,
    QStatusBar, QTabWidget, QTableWidget, QTableWidgetItem,
    QVBoxLayout, QWidget)

class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        if not MainWindow.objectName():
            MainWindow.setObjectName(u"MainWindow")
        MainWindow.resize(800, 600)  # Poprawiona domyślna wielkość okna

        self.centralwidget = QWidget(MainWindow)
        self.centralwidget.setObjectName(u"centralwidget")
        self.verticalLayout_2 = QVBoxLayout(self.centralwidget)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")

        # Sekcja przycisków
        self.Buttons = QWidget(self.centralwidget)
        self.Buttons.setObjectName(u"Buttons")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Fixed)
        self.Buttons.setSizePolicy(sizePolicy)

        self.gridLayout_2 = QGridLayout(self.Buttons)
        self.gridLayout_2.setObjectName(u"gridLayout_2")

        self.pushButton = QPushButton(self.Buttons)
        self.pushButton.setObjectName(u"pushButton")
        self.gridLayout_2.addWidget(self.pushButton, 0, 0, 1, 1)

        self.pushButton_2 = QPushButton(self.Buttons)
        self.pushButton_2.setObjectName(u"pushButton_2")
        self.gridLayout_2.addWidget(self.pushButton_2, 0, 1, 1, 1)

        self.pushButton_3 = QPushButton(self.Buttons)
        self.pushButton_3.setObjectName(u"pushButton_3")
        self.gridLayout_2.addWidget(self.pushButton_3, 0, 3, 1, 1)

        self.pushButton_4 = QPushButton(self.Buttons)
        self.pushButton_4.setObjectName(u"pushButton_4")
        self.gridLayout_2.addWidget(self.pushButton_4, 0, 2, 1, 1)

        self.pushButton_5 = QPushButton(self.Buttons)
        self.pushButton_5.setObjectName(u"pushButton_5")
        self.gridLayout_2.addWidget(self.pushButton_5, 0, 4, 1, 1)



        self.verticalLayout_2.addWidget(self.Buttons)

        # Sekcja wyszukiwania
        self.Searchbars = QWidget(self.centralwidget)
        self.Searchbars.setObjectName(u"Searchbars")
        self.verticalLayout = QVBoxLayout(self.Searchbars)
        self.verticalLayout.setObjectName(u"verticalLayout")

        self.lineEdit = QLineEdit(self.Searchbars)
        self.lineEdit.setObjectName(u"lineEdit")
        self.lineEdit.setMaximumSize(QSize(400, 16777215))

        self.verticalLayout.addWidget(self.lineEdit)

        self.comboBox = QComboBox(self.Searchbars)
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.addItem("")
        self.comboBox.setObjectName(u"comboBox")
        self.comboBox.setMaximumSize(QSize(400, 16777215))
        self.verticalLayout.addWidget(self.comboBox)

        self.verticalLayout_2.addWidget(self.Searchbars)

        # Sekcja tabeli
        self.tableWidget = QTableWidget(self.centralwidget)
        self.tableWidget.setObjectName("tableWidget")

        # Ustawienie liczby kolumn i nagłówków


        # Polityka rozmiaru tabeli
        self.tableWidget.setSizePolicy(QSizePolicy.Expanding, QSizePolicy.Expanding)

        # Automatyczne rozciąganie kolumn do szerokości tabeli
        self.tableWidget.horizontalHeader().setSectionResizeMode(QHeaderView.Stretch)

        # Kontekst menu i wygląd
        self.tableWidget.setContextMenuPolicy(Qt.NoContextMenu)
        self.tableWidget.setAutoFillBackground(False)
        self.tableWidget.setFrameShape(QFrame.NoFrame)
        self.tableWidget.setFrameShadow(QFrame.Plain)
        self.tableWidget.setAutoScroll(True)
        self.tableWidget.setSelectionMode(QAbstractItemView.NoSelection)

        self.verticalLayout_2.addWidget(self.tableWidget)

        # Przestrzeń na dole

        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QMenuBar(MainWindow)
        self.menubar.setObjectName(u"menubar")
        self.menubar.setGeometry(QRect(0, 0, 800, 33))
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QStatusBar(MainWindow)
        self.statusbar.setObjectName(u"statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QCoreApplication.processEvents()

    def retranslateUi(self, MainWindow):
        MainWindow.setWindowTitle(QCoreApplication.translate("MainWindow", u"MainWindow", None))
        self.pushButton.setText(QCoreApplication.translate("MainWindow", u"Newsletter", None))
        self.pushButton_2.setText(QCoreApplication.translate("MainWindow", u"Zamówienia", None))
        self.pushButton_3.setText(QCoreApplication.translate("MainWindow", u"Zarządzanie sklepem", None))
        self.pushButton_4.setText(QCoreApplication.translate("MainWindow", u"Produkty", None))
        self.lineEdit.setPlaceholderText(QCoreApplication.translate("MainWindow", u"Szukaj", None))
        self.lineEdit.returnPressed.connect(self.on_search)
        self.pushButton_5.setText(QCoreApplication.translate("MainWindow", u"Wysylanie maila", None))
        self.comboBox.setItemText(0, "")
        self.comboBox.setItemText(1, QCoreApplication.translate("MainWindow", u"Test 1", None))
        self.comboBox.setItemText(2, QCoreApplication.translate("MainWindow", u"Test 2", None))

