
class Producto():

    def __init__(self):
        pass

    @property
    def nombre(self):
        return self.__nombre

    @nombre.setter
    def nombre(self, nombre):
        if nombre:
            self.__nombre = nombre
        else:
            raise ValueError("El nombre no es valido.")

    @property
    def precio(self):
        return self.__precio

    @precio.setter
    def precio(self, precio):
        if precio:
            self.__precio = precio
        else:
            raise ValueError("El precio no es valido.")

    @property
    def detalle(self):
        return self.__detalle

    @detalle.setter
    def detalle(self, detalle):
        if detalle:
            self.__detalle = detalle
        else:
            raise ValueError("El detalle no es valido")