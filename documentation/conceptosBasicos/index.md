# Conceptos basicos en JavaScript

## Conceptos previos

### Tipos de variables

#### Variables globales

Las variables globales son aquellas definidas utilizando la palabra reservada
**var**. Estas variables, como su nombre lo indica, son de alcance global
a todo el proyecto y pueden ser leidas y modificadas dentro del mismo archivo
sin importar el bloque de codigo en el que fue definida.

> **NOTA:** Su uso es desaconsejado ya que pueden causar problemas.

Ejemplo:

``` javascript
    var x = 1;

    if (x === 1) {
    var x = 2;

    console.log(x);
    // resultado esperado: 2
    }

    console.log(x);
    // resultado esperado: 2
```

#### Variables locales

Las variables locales son aquellas definidas utilizando la palabra reservada
**let**. Estas variables tienen un alcance reducido al de las variables
globales y solo pueden ser leidas o modificadas dentro del mismo archivo
y en el mismo bloque de codigo en el que fue definida.

Ejemplo:

``` javascript
    let x = 1;

    if (x === 1) {
    let x = 2;

    console.log(x);
    // expected output: 2
    }

    console.log(x);
    // expected output: 1
```

#### Constantes

Las constantes son aquellas definidas utilizando la palabra reservada
**const**. Este tipo de *variable* tienen el mismo alcance que las variables
locales, por lo que pueden ser leidas dentro del mismo archivo y en el
mismo bloque de codigo en el que fue definida.

> **Nota:** Las constantes no pueden ser modificadas.

Ejemplo:

```javascript
    const number = 42;

    try {
    number = 99;
    } catch (err) {
    console.log(err);
    // Resultado esperado: TypeError: invalid assignment to const `number'
    // Nota: El tipo de error puede variar dependiendo del  navegador
    }

    console.log(number);
    // Resultado esperado: 42
```

### Ver mas

- [Operaciones basicas.](./operacionesBasicas.md)
