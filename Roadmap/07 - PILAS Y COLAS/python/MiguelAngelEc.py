# PILAS / STACKS (LIFO)

# lista = []

# def pushFirst(*args) -> None:
#     for arg in args:
#         lista.append(arg)

# def popLast():
#     return lista.pop()

# while True:
#     pushFirst(input("Introduce un elemento: "))
#     if input("¿Quieres introducir otro elemento? (s/n): ") == "n":
#         break

# print(lista)

# while lista:
#     elemento_sacado = popLast()
#     print(f"Sacado: {elemento_sacado}")

# COLAS / QUEUES (FIFO)

# ListaFIFO = []

# def pushFirst(*args) -> None:
#     for arg in args:
#         ListaFIFO.append(arg)

# def popFirst():
#     return ListaFIFO.pop(0)

# while True:
#     pushFirst(input("Introduce un elemento: "))
#     if input("¿Quieres introducir otro elemento? (s/n): ") == "n":
#         break

# print(ListaFIFO)

# while ListaFIFO:
#     elemento_sacado = popFirst()
#     print(f"Sacado: {elemento_sacado}")

#Web Navigator
# history = []
# current_index = -1

# while True:
    
#     print("Inicio del Programa")
#     print("1. Añadir una URL")
#     print("2. Navegar hacia adelante")
#     print("3. Navegar hacia atrás")
#     print("4. Mostrar todas las URLs")
#     print("5. Salir")
    
#     opcion = input("Introduce una opción: ")
    
#     match opcion:
#         case "1":
#             while True:
#                 url = input("Introduce una URL: ")
#                 # Truncate forward history if not at the end
#                 if current_index < len(history) - 1:
#                     history[:] = history[:current_index + 1]
#                 history.append(url)
#                 current_index = len(history) - 1
#                 print(f"URL añadida: {url}")
#                 if input("¿Quieres introducir otra URL? (s/n): ") == "n":
#                     break
#         case "2":
#             if current_index < len(history) - 1:
#                 current_index += 1
#                 print("\n")
#                 print("#####Navegando hacia adelante#####")
#                 print(f"URL actual: {history[current_index]}")
#                 print("\n")
#             else:
#                 print("\n")
#                 print("#####No hay URLs adelante#####")
#                 print("\n")
#         case "3":
#             if current_index > 0:
#                 current_index -= 1
#                 print("\n")
#                 print("#####Navegando hacia atrás#####")
#                 print(f"URL actual: {history[current_index]}")
#                 print("\n")
#             else:
#                 print("\n")
#                 print("#####No hay URLs atrás#####")
#                 print("\n")
#         case "4":
#             if len(history) > 0:
#                 print("\n")
#                 print("#####Historial de URLs#####")
#                 print("\n")
#                 for i, url in enumerate(history):
#                     if i == current_index:
#                         print(f"-> {url} (actual)")
#                     else:
#                         print(f"   {url}")
#                 print("\n")
#             else:
#                 print("No hay URLs en el historial")
#         case "5":
#             break
#         case _:
#             print("\n")
#             print("#####Opción no válida######")
#             print("\n")
# Simulador de Impresora Compartida usando Cola (FIFO)

cola_documentos = []

print("Simulador de Impresora Compartida.")
print("Introduce nombres de documentos para encolar, 'imprimir' para descolar e imprimir el primero, o 'salir' para terminar.")

while True:
    entrada = input(">> ").strip()
    
    if entrada.lower() == "salir":
        print("Saliendo del simulador.")
        break
    elif entrada.lower() == "imprimir":
        if cola_documentos:
            doc = cola_documentos.pop(0)
            print(f"Imprimiendo documento: {doc}")
        else:
            print("No hay documentos en la cola para imprimir.")
    else:
        cola_documentos.append(entrada)
        print(f"Documento '{entrada}' agregado a la cola.")
    
    print(f"Documentos pendientes en cola: {len(cola_documentos)}")
    if cola_documentos:
        print(f"Primer documento: {cola_documentos[0]}")
    print()
