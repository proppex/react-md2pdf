# md2pdf

We are creating a react module to parse a Markdown formatted text into PDF using the [react-pdf](https://react-pdf.org/) library.

## Usage

Using the component is quite simple. Just insert the `<Markdown />` JSX tag as a component in the React-PDF `Page`:

```tsx
<PDFViewer width={500} height={800}>
  <Document>
    <Page size="A4" style={styles.page}>
      <Markdown md={markdownText} />
    </Page>
  </Document>
</PDFViewer>
```

## Contributing

The library converts the Markdown string by composing the [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree)
and then traverse the resultant tree in a recursive fashion.

### Resources

- To parse the Markdown document to Abstract Syntax Tree we are using [Remark.js](https://remark.js.org)
-

### How to test

To test the development of the library:

1. Build the library on watch mode

   ```sh
   # In the root folder
   npm run build -- --watch
   ```

   That will keep the builder running and watching for any change.

2. Run the test server

   ```sh
   # In the server-test folder
   # First install dependencies
   npm ci

   # Second run the server in dev mode
   num run dev
   ```

The server has the dependency to the lib as a folder link, which means that it
will get any modification without the need to restart the server.
Nonetheless, any changes to the library will require to refresh the page.
