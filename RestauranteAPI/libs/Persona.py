class Persona:

    def __init__(self):
        from time import time
        self.__clave = str(int(time() / 0.017))[1:]
        self.__nombre = None

    @property
    def clave(self):
        return self.__clave

    @clave.setter
    def clave(self, clave):
        if clave:
            self.__clave = clave
        else:
            raise ValueError("La clave no es valida.")

    @property
    def nombre(self):
        return self.__nombre

    @nombre.setter
    def nombre(self, nombre):
        if nombre:
            self.__nombre = nombre
        else:
            raise ValueError("No es un nombre valido.")

    @property
    def usuario(self):
        return self.__usuario

    @usuario.setter
    def usuario(self, usuario):
        if usuario:
            self.__usuario = usuario
        else:
            raise ValueError("El usuario no es valido.")

    @property
    def email(self):
        return self.__email

    @email.setter
    def email(self,email):
        if email:
            self.__email = email
        else:
            raise ValueError("El email no es valido.")

    @property
    def telefono(self):
        return self.__telefono

    @telefono.setter
    def telefono(self, telefono):
        if telefono:
            self.__telefono = telefono
        else:
            raise ValueError("El numero de telefono no es valido.")

    @property
    def direccion(self):
        return self.__direccion

    @direccion.setter
    def direccion(self, direccion):
        if direccion:
            self.__direccion = direccion
        else:
            raise ValueError("La direccion no es valida.")
