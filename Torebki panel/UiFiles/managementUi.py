# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'managementUiVrRxVi.ui'
##
## Created by: Qt User Interface Compiler version 6.8.2
##
## WARNING! All changes made in this file will be lost when recompiling UI file!
################################################################################

from PySide6.QtCore import (QCoreApplication, QDate, QDateTime, QLocale,
    QMetaObject, QObject, QPoint, QRect,
    QSize, QTime, QUrl, Qt)
from PySide6.QtGui import (QBrush, QColor, QConicalGradient, QCursor,
    QFont, QFontDatabase, QGradient, QIcon,
    QImage, QKeySequence, QLinearGradient, QPainter,
    QPalette, QPixmap, QRadialGradient, QTransform)
from PySide6.QtWidgets import (QApplication, QComboBox, QFormLayout, QLabel,
    QLineEdit, QPushButton, QScrollArea, QSizePolicy,
    QVBoxLayout, QWidget)

class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.setWindowModality(Qt.WindowModality.WindowModal)
        Form.resize(765, 551)
        Form.setAcceptDrops(True)
        Form.setAutoFillBackground(True)
        self.verticalLayout = QVBoxLayout(Form)
        self.verticalLayout.setObjectName(u"verticalLayout")
        self.scrollArea = QScrollArea(Form)
        self.scrollArea.setObjectName(u"scrollArea")
        self.scrollArea.setWidgetResizable(True)
        self.scrollAreaWidgetContents_2 = QWidget()
        self.scrollAreaWidgetContents_2.setObjectName(u"scrollAreaWidgetContents_2")
        self.scrollAreaWidgetContents_2.setGeometry(QRect(0, -185, 733, 750))
        self.verticalLayout_4 = QVBoxLayout(self.scrollAreaWidgetContents_2)
        self.verticalLayout_4.setObjectName(u"verticalLayout_4")
        self.label = QLabel(self.scrollAreaWidgetContents_2)
        self.label.setObjectName(u"label")
        font = QFont()
        font.setPointSize(20)
        self.label.setFont(font)
        self.label.setAlignment(Qt.AlignmentFlag.AlignCenter)

        self.verticalLayout_4.addWidget(self.label)

        self.widget = QWidget(self.scrollAreaWidgetContents_2)
        self.widget.setObjectName(u"widget")
        self.verticalLayout_2 = QVBoxLayout(self.widget)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.label_2 = QLabel(self.widget)
        self.label_2.setObjectName(u"label_2")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Preferred)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.label_2.sizePolicy().hasHeightForWidth())
        self.label_2.setSizePolicy(sizePolicy)
        font1 = QFont()
        font1.setPointSize(16)
        self.label_2.setFont(font1)

        self.verticalLayout_2.addWidget(self.label_2)

        self.form = QWidget(self.widget)
        self.form.setObjectName(u"form")
        sizePolicy1 = QSizePolicy(QSizePolicy.Policy.Preferred, QSizePolicy.Policy.Maximum)
        sizePolicy1.setHorizontalStretch(0)
        sizePolicy1.setVerticalStretch(0)
        sizePolicy1.setHeightForWidth(self.form.sizePolicy().hasHeightForWidth())
        self.form.setSizePolicy(sizePolicy1)
        self.formLayout = QFormLayout(self.form)
        self.formLayout.setObjectName(u"formLayout")
        self.formLayout.setHorizontalSpacing(20)
        self.formLayout.setVerticalSpacing(10)
        self.label_3 = QLabel(self.form)
        self.label_3.setObjectName(u"label_3")

        self.formLayout.setWidget(0, QFormLayout.LabelRole, self.label_3)

        self.label_4 = QLabel(self.form)
        self.label_4.setObjectName(u"label_4")

        self.formLayout.setWidget(2, QFormLayout.LabelRole, self.label_4)

        self.DodawanieOpis = QLineEdit(self.form)
        self.DodawanieOpis.setObjectName(u"DodawanieOpis")
        sizePolicy2 = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.MinimumExpanding)
        sizePolicy2.setHorizontalStretch(0)
        sizePolicy2.setVerticalStretch(0)
        sizePolicy2.setHeightForWidth(self.DodawanieOpis.sizePolicy().hasHeightForWidth())
        self.DodawanieOpis.setSizePolicy(sizePolicy2)

        self.formLayout.setWidget(3, QFormLayout.SpanningRole, self.DodawanieOpis)

        self.label_5 = QLabel(self.form)
        self.label_5.setObjectName(u"label_5")

        self.formLayout.setWidget(4, QFormLayout.LabelRole, self.label_5)

        self.DodawanieStan = QLineEdit(self.form)
        self.DodawanieStan.setObjectName(u"DodawanieStan")

        self.formLayout.setWidget(5, QFormLayout.LabelRole, self.DodawanieStan)

        self.label_6 = QLabel(self.form)
        self.label_6.setObjectName(u"label_6")

        self.formLayout.setWidget(8, QFormLayout.LabelRole, self.label_6)

        self.DodawanieZdjecia = QPushButton(self.form)
        self.DodawanieZdjecia.setObjectName(u"DodawanieZdjecia")
        sizePolicy3 = QSizePolicy(QSizePolicy.Policy.Maximum, QSizePolicy.Policy.Minimum)
        sizePolicy3.setHorizontalStretch(0)
        sizePolicy3.setVerticalStretch(0)
        sizePolicy3.setHeightForWidth(self.DodawanieZdjecia.sizePolicy().hasHeightForWidth())
        self.DodawanieZdjecia.setSizePolicy(sizePolicy3)
        self.DodawanieZdjecia.setMaximumSize(QSize(200, 203))

        self.formLayout.setWidget(9, QFormLayout.SpanningRole, self.DodawanieZdjecia)

        self.DodawanieNazwa = QLineEdit(self.form)
        self.DodawanieNazwa.setObjectName(u"DodawanieNazwa")

        self.formLayout.setWidget(1, QFormLayout.SpanningRole, self.DodawanieNazwa)

        self.label_7 = QLabel(self.form)
        self.label_7.setObjectName(u"label_7")

        self.formLayout.setWidget(6, QFormLayout.LabelRole, self.label_7)

        self.DodawanieCena = QLineEdit(self.form)
        self.DodawanieCena.setObjectName(u"DodawanieCena")

        self.formLayout.setWidget(7, QFormLayout.LabelRole, self.DodawanieCena)

        self.DodawanieZatwierdz = QPushButton(self.form)
        self.DodawanieZatwierdz.setObjectName(u"DodawanieZatwierdz")
        sizePolicy1.setHeightForWidth(self.DodawanieZatwierdz.sizePolicy().hasHeightForWidth())
        self.DodawanieZatwierdz.setSizePolicy(sizePolicy1)

        self.formLayout.setWidget(10, QFormLayout.SpanningRole, self.DodawanieZatwierdz)


        self.verticalLayout_2.addWidget(self.form)


        self.verticalLayout_4.addWidget(self.widget)

        self.label_8 = QLabel(self.scrollAreaWidgetContents_2)
        self.label_8.setObjectName(u"label_8")
        self.label_8.setFont(font1)

        self.verticalLayout_4.addWidget(self.label_8, 0, Qt.AlignmentFlag.AlignHCenter)

        self.widget_2 = QWidget(self.scrollAreaWidgetContents_2)
        self.widget_2.setObjectName(u"widget_2")
        self.verticalLayout_3 = QVBoxLayout(self.widget_2)
        self.verticalLayout_3.setObjectName(u"verticalLayout_3")
        self.EditSelect = QComboBox(self.widget_2)
        self.EditSelect.addItem("")
        self.EditSelect.setObjectName(u"EditSelect")
        sizePolicy4 = QSizePolicy(QSizePolicy.Policy.Minimum, QSizePolicy.Policy.Fixed)
        sizePolicy4.setHorizontalStretch(0)
        sizePolicy4.setVerticalStretch(0)
        sizePolicy4.setHeightForWidth(self.EditSelect.sizePolicy().hasHeightForWidth())
        self.EditSelect.setSizePolicy(sizePolicy4)
        self.EditSelect.setMaximumSize(QSize(300, 16777215))

        self.verticalLayout_3.addWidget(self.EditSelect)

        self.label_9 = QLabel(self.widget_2)
        self.label_9.setObjectName(u"label_9")

        self.verticalLayout_3.addWidget(self.label_9)

        self.EditName = QLineEdit(self.widget_2)
        self.EditName.setObjectName(u"EditName")

        self.verticalLayout_3.addWidget(self.EditName)

        self.label_10 = QLabel(self.widget_2)
        self.label_10.setObjectName(u"label_10")

        self.verticalLayout_3.addWidget(self.label_10)

        self.EditDesc = QLineEdit(self.widget_2)
        self.EditDesc.setObjectName(u"EditDesc")

        self.verticalLayout_3.addWidget(self.EditDesc)

        self.label_11 = QLabel(self.widget_2)
        self.label_11.setObjectName(u"label_11")

        self.verticalLayout_3.addWidget(self.label_11)

        self.EditStock = QLineEdit(self.widget_2)
        self.EditStock.setObjectName(u"EditStock")
        sizePolicy5 = QSizePolicy(QSizePolicy.Policy.Maximum, QSizePolicy.Policy.Fixed)
        sizePolicy5.setHorizontalStretch(0)
        sizePolicy5.setVerticalStretch(0)
        sizePolicy5.setHeightForWidth(self.EditStock.sizePolicy().hasHeightForWidth())
        self.EditStock.setSizePolicy(sizePolicy5)

        self.verticalLayout_3.addWidget(self.EditStock)

        self.label_12 = QLabel(self.widget_2)
        self.label_12.setObjectName(u"label_12")

        self.verticalLayout_3.addWidget(self.label_12)

        self.EditPrice = QLineEdit(self.widget_2)
        self.EditPrice.setObjectName(u"EditPrice")
        sizePolicy5.setHeightForWidth(self.EditPrice.sizePolicy().hasHeightForWidth())
        self.EditPrice.setSizePolicy(sizePolicy5)

        self.verticalLayout_3.addWidget(self.EditPrice)

        self.EditSubmit = QPushButton(self.widget_2)
        self.EditSubmit.setObjectName(u"EditSubmit")

        self.verticalLayout_3.addWidget(self.EditSubmit)


        self.verticalLayout_4.addWidget(self.widget_2)

        self.scrollArea.setWidget(self.scrollAreaWidgetContents_2)

        self.verticalLayout.addWidget(self.scrollArea)


        self.retranslateUi(Form)

        QMetaObject.connectSlotsByName(Form)
    # setupUi

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
#if QT_CONFIG(whatsthis)
        Form.setWhatsThis(QCoreApplication.translate("Form", u"<html><head/><body><p>Edycja skelpu</p><p><br/></p></body></html>", None))
#endif // QT_CONFIG(whatsthis)
        self.label.setText(QCoreApplication.translate("Form", u"EDYCJA STRONY", None))
        self.label_2.setText(QCoreApplication.translate("Form", u"DODAWANIE PRODUKTU", None))
        self.label_3.setText(QCoreApplication.translate("Form", u"Nazwa Produktu", None))
        self.label_4.setText(QCoreApplication.translate("Form", u"Opis produktu", None))
        self.label_5.setText(QCoreApplication.translate("Form", u"Stan Produktu", None))
        self.label_6.setText(QCoreApplication.translate("Form", u"Wybierz od dw\u00f3ch do czterech zdj\u0119\u0107", None))
        self.DodawanieZdjecia.setText(QCoreApplication.translate("Form", u"Wybierz pliki", None))
        self.label_7.setText(QCoreApplication.translate("Form", u"Cena w formacie 1000.00", None))
        self.DodawanieCena.setText("")
        self.DodawanieZatwierdz.setText(QCoreApplication.translate("Form", u"Zatwierd\u017a", None))
        self.label_8.setText(QCoreApplication.translate("Form", u"EDYCJA PRODUKTOW", None))
        self.EditSelect.setItemText(0, QCoreApplication.translate("Form", u"Wybierz Produkt", None))

        self.label_9.setText(QCoreApplication.translate("Form", u"Nazwa", None))
        self.label_10.setText(QCoreApplication.translate("Form", u"Opis", None))
        self.EditDesc.setText(QCoreApplication.translate("Form", u"Produkt 1", None))
        self.label_11.setText(QCoreApplication.translate("Form", u"Stan", None))
        self.label_12.setText(QCoreApplication.translate("Form", u"Cena (taki sam format", None))
        self.EditSubmit.setText(QCoreApplication.translate("Form", u"Zatwierd\u017a edycje produktu", None))
    # retranslateUi

