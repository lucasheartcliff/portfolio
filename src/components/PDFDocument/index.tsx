import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import moment from 'moment';
import React from 'react';

import profile from '@/public/assets/jsons/profile.json';

// Register standard font (optional, but ensures consistency)
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/0.ttf' }, // Standard
    {
      src: 'https://fonts.gstatic.com/s/helvetica/v1/0.ttf',
      fontWeight: 'bold',
    }, // Bold (simulated for standard fonts in react-pdf often works without src if using built-in names)
  ],
});

// Styles: Strict single-column, highly readable, standard typography
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#000000', // Absolute black for best contrast
    flexDirection: 'column', // Force column layout
  },
  // Header Section
  header: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold', // Helvetica-Bold
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  jobTitle: {
    fontSize: 12,
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 8,
  },
  // Section Headers
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 15,
    marginBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cccccc',
    paddingBottom: 2,
  },
  // Content Blocks
  block: {
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  dateLocation: {
    fontSize: 10,
    textAlign: 'right',
  },
  paragraph: {
    fontSize: 10,
    textAlign: 'justify',
    marginTop: 2,
  },
  // Skills List
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillItem: {
    marginRight: 5,
    marginBottom: 3,
  },
});

// Helper for MM/YYYY date format
const formatDate = (dateString: string) => {
  if (!dateString) return 'Present';
  return moment(dateString).format('MM/YYYY');
};

const PDFDocument = () => {
  // Join skills for keywords metadata
  const keywords = (profile as any).skills
    ? (profile as any).skills.join(', ')
    : '';

  return (
    <Document
      title={`${profile.firstName} ${profile.lastName} - CV`}
      author={`${profile.firstName} ${profile.lastName}`}
      keywords={keywords}
      subject="Software Engineer CV"
      language="en"
    >
      <Page size="A4" style={styles.page}>
        {/* HEADER: Name, Title, Contact */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.jobTitle}>
            Software Engineer | Full-Stack Developer
          </Text>
          <Text style={styles.contactInfo}>
            {profile.email} | {profile.phone}
          </Text>
          <Text style={styles.contactInfo}>github.com/{profile.username}</Text>
        </View>

        {/* PROFESSIONAL SUMMARY */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.paragraph}>{profile.introductionBio}</Text>
        </View>

        {/* CORE COMPETENCIES (Skills) */}
        {(profile as any).skills && (profile as any).skills.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <Text style={styles.paragraph}>
              {(profile as any).skills.join(' • ')}
            </Text>
          </View>
        )}

        {/* WORK EXPERIENCE */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {profile.experience.map((exp: any, index: number) => (
            <View key={`exp-${index}`} style={{ marginBottom: 10 }}>
              {/* Company Name Row */}
              <View style={{ ...styles.rowHeader, marginBottom: 4 }}>
                <Text style={styles.companyName}>{exp.title}</Text>
                <Text style={styles.dateLocation}>
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </Text>
              </View>



              {/* Roles Loop */}
              {exp.children ?
                exp.children.map((role: any, rIndex: number) => (
                  <View
                    key={`role-${rIndex}`}
                    style={{ marginBottom: 8, paddingLeft: 0 }}
                  >
                    <View style={styles.rowHeader}>
                      <Text style={styles.roleTitle}>{role.title}</Text>
                      <Text style={styles.dateLocation}>
                        {formatDate(role.startDate)} –{' '}
                        {role.endDate ? formatDate(role.endDate) : 'Present'}
                      </Text>
                    </View>
                    {role.description && (
                      <Text style={styles.paragraph}>
                        {role.description
                          .replace(/\n\n/g, '\n')}
                      </Text>
                    )}
                  </View>
                )) : exp.description && (
                  <Text style={styles.paragraph}>
                    {exp.description.replace(/\n\n/g, '\n').replace(/\n/g, ' ')}
                  </Text>
                )}
            </View>
          ))}
        </View>

        {/* EDUCATION */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Education</Text>
          {profile.education.map((edu: any, index: number) => (
            <View key={`edu-${index}`} style={{ marginBottom: 6 }}>
              <View style={styles.rowHeader}>
                <Text style={{ fontWeight: 'bold', fontSize: 11 }}>
                  {edu.title}
                </Text>
                <Text style={styles.dateLocation}>
                  {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                </Text>
              </View>
              {edu.subtitle && (
                <Text style={styles.paragraph}>{edu.subtitle}</Text>
              )}
              {edu.children &&
                edu.children.map((child: any, cIndex: number) => (
                  <Text
                    key={cIndex}
                    style={{ fontSize: 10, fontStyle: 'italic' }}
                  >
                    {child.title} ({formatDate(child.startDate)} -{' '}
                    {formatDate(child.endDate)})
                  </Text>
                ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
