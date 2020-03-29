from .Persona import Persona


class Pedido(Persona):

    productos_a_comprar = []

    def agregar(self, producto):
        self.productos_a_comprar.append(producto)

    def asignar(self, nombre):
        self.nombre = nombre

    def pertenece_a(self):
        return self.nombre

# class Estudiante(Persona):
#     '''Clase que hereda a Persona.'''
#     tira_de_materias = []
#
#     def inscripcion(self, materia):
#         '''Añade elementos a tira_de_materias.'''
#         self.tira_de_materias.append(materia)
