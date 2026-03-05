import unittest

def suma(a, b):
    return a + b

class PruebaSuma(unittest.TestCase):
    def test_suma(self):
        self.assertEqual(suma(10,5),15)

class PruebaUsuario(unittest.TestCase):
    def setUp(self):
        self.usuario = {
            "name": "Miguel Angel",
            "age": 38,
            "birthdate": datetime.strptime("03-09-75", "%d-%m-%y").date(),
            "languages": ["PHP", "Javascript", "Java"]
        }

    def test_fields(self):
        self.assertIn("name", self.usuario)
        self.assertIn("age", self.usuario)
        self.assertIn("birthdate", self.usuario)
        self.assertIn("languages", self.usuario)

    def test_types(self):
        self.assertIsInstance(self.usuario["name"], str)
        self.assertIsInstance(self.usuario["age"], int)
        self.assertIsInstance(self.usuario["birthdate"], date)
        self.assertIsInstance(self.usuario["languages"], list)

if __name__ == '__main__':
    unittest.main()