import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { Category } from '@/types';

// Registrar fuentes (opcional, para mejor tipografía)
// Font.register({
//   family: 'Oswald',
//   src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
// });

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
    // fontFamily: 'Oswald',
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderColor: '#d1d5db',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f3f4f6',
    padding: 8,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  tableCell: {
    fontSize: 10,
    color: '#374151',
  },
  descriptionCell: {
    width: '50%',
  },
  statusCell: {
    width: '25%',
  },
  active: {
    color: '#16a34a',
    fontWeight: 'bold',
  },
  inactive: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: 'grey',
    fontSize: 10,
  },
});

interface CategoriesPdfDocumentProps {
  data: Category[];
}

export const CategoriesPdfDocument = ({ data }: CategoriesPdfDocumentProps) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <Text style={styles.header}>Reporte de Categorías</Text>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>Nombre</Text>
          </View>
          <View style={[styles.tableColHeader, styles.descriptionCell]}>
            <Text style={styles.tableCellHeader}>Descripción</Text>
          </View>
          <View style={[styles.tableColHeader, styles.statusCell]}>
            <Text style={styles.tableCellHeader}>Estado</Text>
          </View>
        </View>

        {/* Table Body */}
        {data.map(category => (
          <View style={styles.tableRow} key={category.id}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{category.name}</Text>
            </View>
            <View style={[styles.tableCol, styles.descriptionCell]}>
              <Text style={styles.tableCell}>
                {category.description || 'N/A'}
              </Text>
            </View>
            <View style={[styles.tableCol, styles.statusCell]}>
              <Text
                style={[
                  styles.tableCell,
                  category.is_active ? styles.active : styles.inactive,
                ]}
              >
                {category.is_active ? 'Activo' : 'Inactivo'}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    </Page>
  </Document>
);
