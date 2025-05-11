# [React](https://react.dev/)  nillud-data-table Component [![npm version](https://img.shields.io/npm/v/data-table-lib)](https://www.npmjs.com/package/data-table-lib)

## Возможности

✅ Сортировка и фильтрация  
✅ Поддержка экспорта в Excel и Word  
✅ Группировка строк и заголовков  
✅ Поддержка кастомных ячеек и фильтров  
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
Сделай короткий рабочий пример (без кастомных кнопок, модалок и т. д.) — для тех, кто просто хочет запустить:

```tsx
import { DataTable } from 'nillud-data-table'
import 'nillud-data-table/styles.css'

const columns = [{ field: 'name', title: 'Имя' }]
const data = [{ name: 'Иван' }]

<DataTable tableName="my-table" columns={columns} tableData={data} />
```

#### **Развернутый пример**

Вызов со всеми пропсами:

```tsx
import { DataTable } from 'nillud-data-table'
import 'nillud-data-table/styles.css'

import ExportExcel from 'nillud-data-table/export/ExportExcel';
import WordExport from 'nillud-data-table/export/WordExport';

const columns = [{ field: 'name', title: 'Имя' }]
const data = [{ name: 'Иван' }]

<DataTable
    tableName='custom-modal'
    loading={loading}
    loadingElement={loadingElement}
    columns={columns}
    tableData={tableData}
    isFooter
    paginationCounts={[10, 20, 30, 40, 50, 0]}
    scrollable
    scrollHeight={410}
    excelBtn
    wordBtn
    WordExportComponent={WordExport}
    ExportExcelComponent={ExportExcel}
    downloadSectionLeftSideContent={<button className='base-button' onClick={() => setCanvas(true)}>OffCanvas</button>}
    excelCustomColumns={[
        {
            key: 'name',
            width: 50
        }
    ]}
    headerGroup={[{title: 'Личные данные', cols: 3}, {title: 'Объект', cols: 3}]}
    groupBy={'status'}
    isTitles={true}
/>
```

Доступные пропсы компонента:

| props                                                                 | required | type         | Описание |
| :---                                                                  |  :---:   | :---:        |     :--- |
| [columns](#columns)                                                   |   true   | array [\{\}] | Принимает в себя массив объектов      |
| [tableData](#tabledata)                                               |   true   | array [\{\}] | Принимает в себя массив объектов      |
| [tableName](#tablename)                                               |   true   | string       | Наименование таблицы для хранения значений в localStorage        |
| [loading](#loading)                                                   |    -     | boolean      | Состояние загрузки, принимает в себя state типа boolean         |
| [loadingElement](#loadingelement)                                     |    -     | React Element| Кастомный лоадер         |
| [isFooter](#isfooter)                                                 |    -     | boolean      | Отображение footer        |
| [paginationCounts](#paginationcounts)                                 |    -     | array<number>  | Принимает массив чисел, число - количество строк для пагинации, (0 это все) |
| [scrollable](#scrollable)                                             |    -     | boolean      | Зафиксировать высоту таблицы и добавить скролл         |
| [scrollHeight](#scrollheight)                                         |    -     | number       | Высота тела таблицы, работает, если scrollable: true         |
| [exportCustomColumns](#exportcustomcolumns)                           |    -     | array [\{\}] |  Принимает в себя массив объектов (\{\ key: string, width: number \}\)  |
| [excelBtn](#excelbtn)                                                 |    -     | boolean      | Показывать кнопку экспорта Excel        |
| [wordBtn](#wordbtn)                                                   |    -     | boolean      | Показывать кнопку экспорта Word        |
| [downloadSectionLeftSideContent](#downloadsectionleftsidecontent)     |    -     | React Element| Отображать контент с левой стороны от кнопок экспорта |
| [headerGroup](#headergroup)                                           |    -     | array [\{\}] | Группировка столбцов (\{\ title: string, cols: number \}\) |
| [groupBy](#groupby)                                                   |    -     | string       | Группировка данных, указывается заголовок столбца, по которому нужна группировка |
| [isTitles](#istitles)                                                 |    -     | boolean      | Заголовки при наведении на ячейку, по умолчанию false |

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
        field: 'id',
        title: '№',
        width: 70, 
        autoinc: true 
    },
    {
        field: 'name',
        title: 'Наименование',
        filterable: false,
        formatter: function (cell, row) {
            return (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginBottom: 3 }}>{cell}</span>
                    <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => { setModalShow(true); setRowData(row) }}><PenEdit /></span>
                </div>
            )
        },
        exportCustomCell: function (cell, row) {
            return `${cell} - ${row.date_to}`
        },
    },
    {
        field: 'address',
        title: 'Адрес',
        headerFilter: headerFilterAddress
    },
    {
        field: 'obj',
        title: 'Объект',
        sortable: false
    },
]
```

Доступные ключи объекта:

| key                                   | required | type        | description |
| :---                                  |   :---:  | :---:       |   :---      |
| [field](#field)                       |  true    |  string     | Устанавливает связь по ключу в массиве данных tableData            |
| [title](#title)                       |  true    |  string     | Устанавливает заголовок столбца            |
| [width](#width)                       |    -     |  number     | Принимает числовое значение, ограничивает ширину столбца в пикселях            |
| [autoinc](#autoinc)                   |    -     |  bool       | Форматирует значения в столбце по порядку в таблице, начиная с 1            |
| [formatter](#formatter)               |    -     |  func       | Кастомное форматирование, принимает в себя функцию, описание далее             |
| [exportCustomCell](#exportCustomCell) |    -     |  func       | Кастомное форматирование для Excel и Word, принимает в себя функцию, описание далее             |
| [headerFilter](#headerFilter)         |    -     |  func       | Кастомный фильтр, принимает в себя функуцию, описание далее            |
| [sortable](#sortable)                 |    -     |  sortable   | Убирает возможность сортировки, по умолчанию true            |
| [filterable](#filterable)             |    -     |  filterable | Убирает возможность фильтрации, по умолчанию true            |

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
                <span style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => { setModalShow(true); setRowData(row) }}><PenEdit /></span>
            </div>
        )
    },
 }
```

#### exportCustomCell

Кастомное отображение ячейки excel или ячейки таблицы word. Принимает в себя функцию с аргументами cell и row, должна возвращать значение типа string.

```tsx
{
    ...,
    exportCustomCell: function (cell, row) {
        return `${cell} - ${row.date_to}`
    },
}
```

#### headerFilter

Кастомный фильтр колонки. Принимает в себя функцию со значениями headerValue и rowValue

```tsx
// Функция фильтрации

const headerFilterAddress = (headerValue, rowValue) => {
    if (headerValue.includes(" ")) {
        const stringArray = headerValue.split(" ")

        if (!stringArray.includes('')) {
            var row = rowValue.toLowerCase()

            const filtered = []

            for (let i = 0; i < stringArray.length; i++) {
                row = rowValue.toLowerCase().includes(stringArray[i].toLowerCase())

                row ? filtered.push(row) : null
            }

            if (filtered.length === stringArray.length) {
                return rowValue
            }
        } else {
            return rowValue.toLowerCase().includes(stringArray[0].toLowerCase())
        }
    } else {
        return rowValue.toLowerCase().includes(headerValue.toLowerCase())
    }
}

// Объект массива columns

{
    ...,
    headerFilter: headerFilterAddress
}
```

#### sortable

Отображение кнопки сортировки. По умолчанию **true**

#### filterable

Отображение поля фильтрации. По умолчанию **true**

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

### exportCustomColumns

Необязательный параметр. Принимает в себя массив объектов формата.
По умолчанию:
- Ключ header содержит в себе значение **title** объекта из массива columns
- Ключ key содержит в себе значение **field** объекта из массива columns
- Ключ width по умолчанию умеет ширину 20 у.е. по системе Excel

Дополнительные параметры можно добавлять исходя из документации [exceljs](https://www.npmjs.com/package/exceljs). 
Для изменения/добавления каких-либо параметров в массиве необходимо указать объект с нужным ключом **key**

```tsx
excelCustomColumns={[
    {
        key: 'name',
        width: 50
    }
]}
```

### excelBtn

Необязательный параметр. Тип **boolean**, по умолчанию **false**. При значении **true** над таблицей с правой стороны появляется кнопка экспорта Excel, которая по умолчанию принимает в себя исходный массив **tableData**

Для использования модуля Excel необходимо установить библиотеку [exceljs](https://www.npmjs.com/package/exceljs)

```bash
npm i exceljs
-или-
yarn add exceljs
```

```tsx
import ExportExcel from 'nillud-data-table/export/ExportExcel';

<DataTable>
    ...
    excelBtn
    ExportExcelComponent={ExportExcel}
    ...
</DataTable>
```

### wordBtn

Необязательный параметр. Тип **boolean**, по умолчанию **false**. При значении **true** над таблицей с правой стороны появляется кнопка экспорта Word, которая по умолчанию принимает в себя исходный массив **tableData**

Для использования модуля Word необходимо установить библиотеки [docx](https://www.npmjs.com/package/docx) и [file-saver](https://www.npmjs.com/package/file-saver)

```bash
npm i docx file-saver
-или-
yarn add docx file-saver
```

```tsx
import WordExport from 'nillud-data-table/export/WordExport';

<DataTable>
    ...
    wordBtn
    WordExportComponent={WordExport}
    ...
</DataTable>
```

### wordOptions

Необязательный параметр. Используется вместе с **wordBtn**. Принимает в себя объект

```tsx
options = {
    fontSize: 20, // размер шрифта, 
    boldHeaders: false, // Заголовки жирным начертанием, 
    autoLandscape: false, // делать ли альбомный формат, 
    maxColumnsBeforeLandscape: 5 // и от скольки столбцов. 
}
```

### downloadSectionLeftSideContent

Необязательный параметр. Передается **React.Component**. Отображает компонент с левой стороны от кнопок экспорта. Создано для экономии места

```tsx
downloadSectionLeftSideContent={<button className='base-button' onClick={() => setCanvas(true)}>OffCanvas</button>}
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
}

```