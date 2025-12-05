# [React](https://react.dev/)  DataTable Component [![npm version](https://img.shields.io/npm/v/data-table-lib)](https://www.npmjs.com/package/data-table-lib)

## Возможности

✅ Сортировка и фильтрация  
✅ Поддержка кастомных фильтров  
✅ Редактируемые ячейки  
✅ Кастомизация контента в ячейках, возможность внедрять React-компоненты 
✅ Открытые стили, свободное редактирование
✅ Группировка строк и заголовков  
✅ Локальное сохранение состояния (localStorage)  
✅ Поддержка React и TypeScript

## Установка

```tsx
npm install nillud-data-table
# или
yarn add nillud-data-table
```

## Начало работы

#### **Быстрый пример (Quick Start)**

```tsx
import { DataTable } from 'nillud-data-table'
import 'nillud-data-table/styles.css'

const columns = [{ field: 'name', title: 'Имя' }]
const data = [{ name: 'Иван' }]

<DataTable tableName="my-table" columns={columns} tableData={data} />
```

#### **Развернутый пример**

```tsx
import { DataTable } from 'nillud-data-table'
import 'nillud-data-table/styles.css'

const columns = [{ field: 'name', title: 'Имя' }]
const data = [{ name: 'Иван' }]

<DataTable
    tableData={tableData}
    columns={columns}
    tableName='custom-modal'
    loading={loading}
    loadingElement={<div>Loading...</div>}
    isFooter={true}
    paginationCounts={[10, 50, 100, 0]}
    scrollable={true}
    scrollHeight={410}
    headerGroup={[{title: 'Личные данные', cols: 3}, {title: 'Объект', cols: 3}]}
    groupBy={'status'}
    isTitles={true}
/>
```

Доступные пропсы компонента:

| props                                                                 | required | type         | Описание                                                                         |
| :---                                                                  |  :---:   | :---:        |     :---                                                                         |
| [columns](#columns)                                                   |   true   | array [\{\}] | Принимает в себя массив объектов                                                 |
| [tableData](#tabledata)                                               |   true   | array [\{\}] | Принимает в себя массив объектов                                                 |
| [tableName](#tablename)                                               |   true   | string       | Наименование таблицы для хранения значений в localStorage                        |
| [className](#classname)                                               |    -     | string | Принимает в себя строку (Css класс)                                                    |
| [loading](#loading)                                                   |    -     | boolean      | Состояние загрузки, принимает в себя state типа boolean                          |
| [loadingElement](#loadingelement)                                     |    -     | React Element| Кастомный лоадер                                                                 |
| [isFooter](#isfooter)                                                 |    -     | boolean      | Отображение footer                                                               |
| [paginationCounts](#paginationcounts)                                 |    -     | array<number>  | Принимает массив чисел, число - количество строк для пагинации, (0 это все)    |
| [scrollable](#scrollable)                                             |    -     | boolean      | Зафиксировать высоту таблицы и добавить скролл                                   |
| [scrollHeight](#scrollheight)                                         |    -     | number       | Высота тела таблицы, работает, если scrollable: true                             |
| [headerGroup](#headergroup)                                           |    -     | array [\{\}] | Группировка столбцов (\{\ title: string, cols: number \}\)                       |
| [groupBy](#groupby)                                                   |    -     | string       | Группировка данных, указывается заголовок столбца, по которому нужна группировка |
| [isTitles](#istitles)                                                 |    -     | boolean      | Заголовки при наведении на ячейку, по умолчанию false                            |
| [selectByField](#selectbyfield)                                       |    -     | string       | Предвыбрать поля, при использовании selectable                                   |
| [events](#events)                                                     |    -     | {...events}  | Объект событий (onSelect)                                                        |

Типы описаны components/data-table/DataTable.types.ts

Далее подробно про каждый

### columns

Обязательный параметр, принимает в себя массив объектов в формате:

```tsx
{
    field: 'city', 
    title: 'Город' 
},
```
Пример массива: 

```tsx
const columns = [
    {
        field: '',
        title: '',
        width: 50, 
        selectable: true 
    },
    {
        field: 'id',
        title: '№',
        width: 70, 
        autoinc: true 
    },
    {
        field: 'name',
        title: 'Наименование',
        filterable: false,
        isSelectableCell: false,
        formatter: function (cell, row) {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginBottom: 3 }}>{cell}</span>
                    <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => { setModalShow(true); setRowData(row); }}><PenEdit /></span>
                </div>
            )
        },
    },
    {
        field: 'address',
        title: 'Адрес',
        headerFilter(headerValue, rowValue, row) {
            const values = [
                rowValue.toLowerCase(),
                String(row.user_name).toLowerCase(),
                String(row.org_name).toLowerCase()
            ]

            return values.some(e => e.includes(headerValue.toLowerCase()))
        },
    },
]
```

Доступные ключи объекта:

| key                                    | required | type        | description                                                                            |
| :---                                   |   :---:  | :---:       |   :---                                                                                 |
| [field](#field)                        |  true    |  string     | Устанавливает связь по ключу в массиве данных tableData                                |
| [title](#title)                        |  true    |  string     | Устанавливает заголовок столбца                                                        |
| [width](#width)                        |    -     |  number     | Принимает числовое значение, ограничивает ширину столбца в пикселях                    |
| [autoinc](#autoinc)                    |    -     |  bool       | Форматирует значения в столбце по порядку в таблице, начиная с 1                       |
| [formatter](#formatter)                |    -     |  func       | Кастомное форматирование, принимает в себя функцию, описание далее                     |
| [headerFormatter](#headerFormatter)    |    -     |  func       | Кастомное форматирование заголовка колонки, принимает в себя функцию, описание далее   |
| [exportCustomCell](#exportCustomCell)  |    -     |  func       | Кастомное форматирование для Excel, принимает в себя функцию, описание далее           |
| [cellAlignment](#cellAlignment)        |    -     |  string     | Выравнивание контента в ячейке                                                         |
| [headerFilter](#headerFilter)          |    -     |  func       | Кастомный фильтр, принимает в себя функуцию, описание далее                            |
| [sortable](#sortable)                  |    -     |  bool       | Убирает возможность сортировки, по умолчанию true                                      |
| [filterable](#filterable)              |    -     |  bool       | Убирает возможность фильтрации, по умолчанию true                                      |
| [selectable](#selectable)              |    -     |  bool       | Добавляет возможность отмечать строки таблицы                                          |
| [isSelectableCell](#isSelectableCell)  |    -     |  bool       | При активном selectable убирает у ячейки функцию отметить строку при нажатии           |
| [filterPlaceholder](#filterPlaceholder)|    -     |  string     | Задать плейсхолдер для фильтра в инпуте колонки                                        |
| [editable](#editable)                  |    -     |  bool       | Добавляет возможность редактирования ячейки                                            |

#### field

Обязательный параметр, устанавливает связь по ключу в массиве данных tableData

```tsx

// columns 

[
    {
        field: 'name',
        ...
    },
    ...
]

// tableData

[
    {
        name: 'Иван',
        ...
    },
    ...
]

```

#### title

Обязательный параметр, устанавливает заголовок столбца

```tsx

{
    title: 'Имя'
}

```

| Имя |
| --- |
| Иван |

#### width

Устанавливает значение ширины столбца в пикселях, по умолчанию ширина всех столбцов равна

#### autoinc

При значении **true** форматирует значения в столбце по порядку строк 1 ... N

| № |
| --- |
| 1 |
| 2 |
| ... |
| N |

#### formatter

Кастомное отображение ячейки. Принимает в себя функцию с аргументами cell и row, должна возвращать React Component.

```tsx
 {
    ...,
    formatter: function (cell, row) {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginBottom: 3 }}>{cell}</span>
                <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => { setModalShow(true); setRowData(row); }}><PenEdit /></span>
            </div>
        )
    },
 }
```

#### headerFormatter

Кастомное отображение заголовка таблицы. Принимает в себя функцию с аргументом column.title, должна возвращать React Component.

```tsx
 {
    ...,
    headerFormatter: function (column) {
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>Something {column} <Icon size={20} /></div>
            </div>
        )
    },
 }
```

#### exportCustomCell

Кастомное отображение ячейки excel. Принимает в себя функцию с аргументами cell и row, должна возвращать значение типа string.

```tsx
{
    ...,
    exportCustomCell: function (cell, row) {
        return `${cell} - ${row.date_to}`
    },
}
```

#### cellAlignment

Выравнивание контента ячейки таблицы, так же распространяется на выравнивание в Excel

```tsx

type CellAlignment = {
    vertical: 'top' | 'middle' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
}

const columns = {
    ...,
    {
        field: 'name',
        title: 'name',
        cellAlignment: {
            vertical: 'middle',
            horizontal: 'center'
        },
    }
    ...
}

```

#### headerFilter

Кастомный фильтр колонки. Принимает в себя функцию со значениями headerValue, rowValue и не обязательным row

```tsx
// Функция фильтрации

const headerFilter = (headerValue, rowValue, row) => {
    const values = [
        rowValue.toLowerCase(),
        String(row.de_name).toLowerCase(),
        String(row.dco_name).toLowerCase()
    ]

    return values.some(e => e.includes(headerValue.toLowerCase()))
}

// Объект массива columns

{
    ...,
    headerFilter: headerFilter
}
```

#### sortable

Отображение кнопки сортировки. По умолчанию **true**

#### filterable

Отображение поля фильтрации. По умолчанию **true**

#### selectable

Добавляет возможность отметить строку. По умолчанию **false**

Пример вызова:
```tsx
[
    ...,
    {
        field: '',
        title: '',
        selectable: true,
        width: 50
    },
    ...
]
```

Получить отмеченные строки:
```tsx
const selectedData = tableRef.current.getSelectedData()
```

#### isSelectableCell

Наличие функции выбора строки при активном **selectable**, в случе если есть логика кнопки или какого то действия, при котором не надо выполнять select строки

#### filterPlaceholder

Добавление плейсхолдера для инпута фильтрации в заголовке колонки

#### editable

Добавляет возможность редактирования строки. По умолчанию **false**

### tableData

Обязательный параметр, принимает в себя массив объектов. В простой реализации таблицы в массиве **tableData** объекты должны содержать ключи равные значениям ключа **field** объекта в массиве **columns**

```tsx
// объект массива columns

[
    {
        field: 'id',
        ...
    },
]

// объект массива tableData

[
    {
        "id": 1,
        ...
    },
]
```

```tsx
// Пример массива tableData 

const tableData = [
    {
        "id": 1,
        "name": "Крайний правый",
        "city": "Уфа",
        "address": "Менделеева д. 150",
        "zav_num": "A78B4T561",
        "date_to": "Февраль"
    },
]

// Пример массива columns

const columns = [
    {
        field: 'id',
        ...
    },
    {
        field: 'name',
        ...
    },
    {
        field: 'city',
        ...
    },
    {
        field: 'address',
        ...
    },
    {
        field: 'zav_num',
        ...
    },
    {
        field: 'date_to',
        ...
    },
]
```

### tableName

Обязательный параметр. По умолчанию **'table-data'**. Нужен для сохранения в **localStorage** значений 
- sort
- filter
- pagination-counter

### className

Необязательный параметр. Добавляет кастомный CSS класс таблице.

### loading

Необязательный параметр. Состояние загрузки, тип **boolean**, по умолчанию **false**. При значении **true** в теле таблицы отображается соответствующая информация о загрузке данных. Передавать значение React State

### loadingElement

Непобязательный параметр. Используется вместе с **loading**. Принимает **React Element** - который будет отображаться, пока **loading** - **true**

### isFooter

Необязательный параметр. По умолчанию **false**. Отображает **footer** таблицы, а именно:
- Количество строк
- Пагинацию

### paginationCounts

Необязательный параметр. Используется вместе с **isFooter**. Принимает **массив чисел**, число - колчество отображаемых строк.

```tsx
isFooter
paginationCounts={[10, 20, 30, 40, 50, 0]}
```

Если указать 0, то это будет означать отображение всех строк

### scrollable

Необязательный параметр. По умолчанию **false**. Добавляет ограниченную высоту, по умолчанию **300px** и скроллинг таблицы.

### scrollHeight

Непобязательный параметр. Используется вместе с **scrollable**. Принимает **числовое значение** - высота в пикселях

```tsx
scrollable
scrollHeight={410}
```

### headerGroup

Необязательный параметр. Передается **массив объектов**. Отображает сгруппированные заголовки таблицы, где title - заголовок группы, а cols - количество столбцов, на которое растягивается группа

```tsx
headerGroup={[{ title: 'Личные данные', cols: 4 }, { title: 'Оборудование', cols: 2 }]}
```

### groupBy

Необязательный параметр. Передается **строка**. Отображает строки таблицы, сгруппированные по столбцу, указанному в groupBy, каждую группу можно свернуть и раскрыть

```tsx
groupBy={'status'}
```

### isTitles

Необязательный параметр. Передается **boolean** значение. Отображает **html title** при наведении на ячейку, по умолчанию **false**

### selectByField

Необязательный параметр. Передается строка (ключ в массиве данных, значение которого имеет boolean значение) для предвыбора строки при использовании selectable.

### events

Необязательный параметр. Передается объект событий. 
На данный момент имеются:
- onSelect

```tsx
events={{
    onSelect: (data) => {
        console.log(data)
    }
}}
```

```tsx
isTitles
```

### Возможности useRef

Возможность подключиться напрямую к таблице и получить данные после всех манипуляций

```tsx
import { useRef } from "react";

const tableRef = useRef<DataTableRef>(null);

<DataTable
    ...
    ref={tableRef}
    ...
/>

const func = () => {
    const data = tableRef.current.getData() // Получить текущие данные, после сортировки и фильтрации
    const currData = tableRef.current.getCurrentData() // Получить данные с текущей таблицы пагинации
    const selectedData = tableRef.current.getSelectedData() // Получить отмеченные строки
}

```