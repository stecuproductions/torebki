# -*- coding: utf-8 -*-

################################################################################
## Form generated from reading UI file 'designerlEkKJu.ui'
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
from PySide6.QtWidgets import (QApplication, QLabel, QTextEdit, QPushButton,
    QSizePolicy, QVBoxLayout, QWidget)

class Ui_Form(object):
    def setupUi(self, Form):
        if not Form.objectName():
            Form.setObjectName(u"Form")
        Form.resize(400, 336)
        self.verticalLayout_2 = QVBoxLayout(Form)
        self.verticalLayout_2.setObjectName(u"verticalLayout_2")
        self.verticalLayout = QVBoxLayout()
        self.verticalLayout.setObjectName(u"verticalLayout")
        
        self.label = QLabel(Form)
        self.label.setObjectName(u"label")
        self.verticalLayout.addWidget(self.label)

        self.lineEdit = QTextEdit(Form)
        self.lineEdit.setObjectName(u"lineEdit")
        self.verticalLayout.addWidget(self.lineEdit)

        self.label_2 = QLabel(Form)
        self.label_2.setObjectName(u"label_2")
        self.verticalLayout.addWidget(self.label_2)

        self.textEdit = QTextEdit(Form)
        self.textEdit.setObjectName(u"textEdit")
        sizePolicy = QSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Minimum)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(self.textEdit.sizePolicy().hasHeightForWidth())
        self.textEdit.setSizePolicy(sizePolicy)
        self.textEdit.setMinimumSize(QSize(0, 200))
        self.textEdit.setAlignment(Qt.AlignLeft | Qt.AlignTop)  # Wyrównanie tekstu do góry
        
        self.verticalLayout.addWidget(self.textEdit)

        self.verticalLayout_2.addLayout(self.verticalLayout)

        self.pushButton_2 = QPushButton(Form)
        self.pushButton_2.setObjectName(u"pushButton_2")
        self.verticalLayout_2.addWidget(self.pushButton_2)

        self.pushButton = QPushButton(Form)
        self.pushButton.setObjectName(u"pushButton")
        self.verticalLayout_2.addWidget(self.pushButton)

        self.retranslateUi(Form)
        QMetaObject.connectSlotsByName(Form)

    def retranslateUi(self, Form):
        Form.setWindowTitle(QCoreApplication.translate("Form", u"Form", None))
        self.label.setText(QCoreApplication.translate("Form", u"Tytul", None))
        self.label_2.setText(QCoreApplication.translate("Form", u"Tresc", None))
        self.pushButton_2.setText(QCoreApplication.translate("Form", u"Wyślij Newsletter", None))
        self.pushButton.setText(QCoreApplication.translate("Form", u"Podglad", None))
