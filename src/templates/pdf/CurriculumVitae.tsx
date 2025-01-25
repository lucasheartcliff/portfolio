import {
  Document,
  Link,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

import data from '@/public/assets/jsons/profile.json';
// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 12,
    lineHeight: 1.4,
    color: '#333',
    display: 'flex',
  },
  section: { marginBottom: 3 },
  headerSection: {
    marginBottom: 5,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  subHeader: {
    fontSize: 10,
  },
  h1: {
    fontSize: 14,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'center',
  },
  h2: {
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  h3: { fontSize: 10, fontWeight: 'bold', lineHeight: 1.2 },
  listItem: { marginLeft: 5 },
  text: { fontSize: 10, lineHeight: 1.2 },
  description: { fontSize: 10, lineHeight: 1.2, marginLeft: 10 },
  divider: {
    borderBottom: 1,
    borderBottomColor: '#333',
    borderBottomStyle: 'solid',
    width: '100%',
    marginLeft: 10,
  },
  inline: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default function CurriculumVitae() {
  const { t } = useTranslation('common');
  const formatDate = (date?: string) =>
    date ? moment(date).format('MMM YYYY') : t('Now');
  return (
    <PDFViewer width={'100%'} height={800}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.headerSection}>
            <Text style={styles.header}>
              {data.firstName} {data.lastName}
            </Text>
            <Text style={styles.subHeader}>
              <Link src={`https://linkedin.com/in/${data.username}`}>
                {'Linkedin'}
              </Link>
              <Text> | </Text>
              <Link src={`mailto:${data.email}`}>{data.email}</Link>
              <Text> | </Text>
              <Link src={window.location.origin}>{window.location.host}</Link>
              <Text> | </Text>
              <Link
                src={`https://api.whatsapp.com/send?phone=${data.phone}`}
              >{`+${data.phone}`}</Link>
              <Text> | </Text>
              <Link src={`https://github.com/${data.username}`}>
                {'Github'}
              </Link>
            </Text>
          </View>

          {/* Experience */}
          <View style={styles.section}>
            <View style={styles.h1}>
              <Text>{t('Experience')}</Text>
              <View style={styles.divider} />
            </View>
            {data.experience.map((exp, idx) => (
              <View key={idx} style={styles.listItem}>
                <View style={styles.h2}>
                  <Text>{t(exp.title)}</Text>
                  <Text>
                    {`(${formatDate(exp.startDate)} - ${formatDate(
                      exp.endDate
                    )})`}
                  </Text>
                </View>
                <View style={{ marginBottom: 3 }}>
                  {exp.children?.map((child, cIdx) => (
                    <View key={cIdx} style={styles.listItem}>
                      <Text style={styles.description}>
                        {`• ${t(child.description).replace(/\n\n/g, '\n• ')}`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles.section}>
            <View style={styles.h1}>
              <Text>{t('Education')}</Text>
              <View style={styles.divider} />
            </View>
            {data.education.map((edu, idx) => (
              <View
                key={idx}
                style={[styles.inline, styles.text, { marginLeft: 3 }]}
              >
                <Text>{`• ${t(edu.title)}`}</Text>
                <Text style={{ marginLeft: 5 }}>
                  {`(${formatDate(edu.startDate)} - ${formatDate(
                    edu.endDate
                  )})`}
                </Text>
              </View>
            ))}
          </View>

          {/* Certifications */}
          <View style={styles.section}>
            <View style={styles.h1}>
              <Text>{t('Certifications')}</Text>
              <View style={[styles.divider, { marginLeft: 15 }]} />
            </View>
            {data.certification.map((cert, idx) => (
              <View
                key={idx}
                style={[styles.inline, styles.text, { marginLeft: 3 }]}
              >
                <Text>{`• ${t(cert.name)}`}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
