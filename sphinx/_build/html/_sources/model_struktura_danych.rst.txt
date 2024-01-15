Model i struktura danych
========================

**Tabela Użytkowników** przechowująca informacje o klientach oraz pracownikach, takie jak loginy, hasła, dane kontaktowe, role oraz uprawnienia.

**Tabela Pojazdów** przechowująca informacje o pojazdach klientów, takie jak marka, model, rok produkcji oraz identyfikatory użytkowników.

**Tabela Wizyt** przechowująca informacje o umówionych wizytach, takie jak data, czas, przypisany pracownik, identyfikator pojazdu oraz rodzaj naprawy.

**Tabela Części** przechowująca informacje o dostępnych częściach, takie jak nazwa, cena, dostępna ilość oraz identyfikator zamówienia.

**Tabela Zamówień** przechowująca informacje o złożonych zamówieniach części, takie jak lista części, data zamówienia, status realizacji zamówienia oraz identyfikator pracownika.

**Tabela Zdjęć** przechowująca zdjęcia napraw, pojazdów oraz części, powiązane z odpowiednimi identyfikatorami.

.. image:: /_static/struktura_danych.png
   :alt: model i struktura danych
   :width: 1000px
   :align: center
