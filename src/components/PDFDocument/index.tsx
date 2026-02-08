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

// Register standard font for ATS compatibility
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v1/0.ttf' },
    {
      src: 'https://fonts.gstatic.com/s/helvetica/v1/0.ttf',
      fontWeight: 'bold',
    },
  ],
});

// ATS-Friendly Styles: Simple, clean, highly parseable
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#000000',
    flexDirection: 'column',
  },
  // Header Section
  header: {
    marginBottom: 20,
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  professionalTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 4,
  },
  // Section Headers - ATS Standard
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 3,
  },
  // Content Blocks
  block: {
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 10,
    textAlign: 'justify',
    marginBottom: 6,
    lineHeight: 1.5,
  },
  // Bullet Points
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 10,
  },
  bulletSymbol: {
    width: 15,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
  },
  // Work Experience
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 8,
  },
  companyName: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 10,
    textAlign: 'right',
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
    marginTop: 6,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  technologies: {
    fontSize: 9,
    fontStyle: 'italic',
    color: '#333333',
    marginBottom: 4,
  },
  location: {
    fontSize: 9,
    color: '#333333',
    marginBottom: 2,
  },
  // Skills
  skillCategory: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 3,
  },
  skillList: {
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.4,
  },
  // Education & Certifications
  educationItem: {
    marginBottom: 8,
  },
  educationTitle: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  educationDetails: {
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 2,
  },
  certificationItem: {
    marginBottom: 4,
  },
  certificationText: {
    fontSize: 10,
  },
});

// Helper: Format date to MM/YYYY or "Present"
const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Present';
  return moment(dateString).format('MM/YYYY');
};

// Helper: Split description into bullet points
const formatBulletPoints = (description: string): string[] => {
  if (!description) return [];

  // Split by double newlines first, then by single newlines if needed
  const paragraphs = description.split('\n\n');
  const bullets: string[] = [];

  paragraphs.forEach((para) => {
    // If paragraph is already short enough, treat as one bullet
    if (para.length < 200) {
      bullets.push(para.trim());
    } else {
      // Split long paragraphs by sentences
      const sentences = para.split('. ');
      sentences.forEach((sentence, idx) => {
        const trimmed = sentence.trim();
        if (trimmed) {
          // Add period back if it was removed and not the last sentence
          bullets.push(
            idx < sentences.length - 1 && !trimmed.endsWith('.')
              ? `${trimmed}.`
              : trimmed
          );
        }
      });
    }
  });

  return bullets.filter((b) => b.length > 0);
};

// Helper: Render bullet points
const renderBullets = (bullets: string[]) => {
  return bullets.map((bullet, idx) => (
    <View key={idx} style={styles.bulletContainer}>
      <Text style={styles.bulletSymbol}>•</Text>
      <Text style={styles.bulletText}>{bullet}</Text>
    </View>
  ));
};

const PDFDocument = () => {
  // Extract data with type safety
  const profileData = profile as any;

  // Build keywords for metadata
  const keywords = profileData.skills
    ? profileData.skills.join(', ')
    : '';

  // Get professional title
  const professionalTitle =
    profileData.professionalTitle || 'Software Engineer | Full-Stack Developer';

  // Get location
  const location = profileData.location || '';

  // Get achievements if available
  const achievements = profileData.achievements || [];

  // Get skills categories or fall back to flat list
  const skillsCategories = profileData.skillsCategories || null;
  const flatSkills = profileData.skills || [];

  // Get certifications
  const certifications = profileData.certification || [];

  return (
    <Document
      title={`${profile.firstName} ${profile.lastName} - Resume`}
      author={`${profile.firstName} ${profile.lastName}`}
      keywords={keywords}
      subject="Professional Resume - Software Engineer"
      language="en"
    >
      <Page size="A4" style={styles.page}>
        {/* HEADER: Name, Title, Contact */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {profile.firstName} {profile.lastName}
          </Text>
          <Text style={styles.professionalTitle}>{professionalTitle}</Text>
          <Text style={styles.contactInfo}>
            {profile.email} • {profile.phone}
            {location && ` • ${location}`}
          </Text>
          <Text style={styles.contactInfo}>
            GitHub: github.com/{profile.username}
            {profileData.linkedin && ` • LinkedIn: ${profileData.linkedin}`}
          </Text>
        </View>

        {/* ABOUT / PROFESSIONAL SUMMARY */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>ABOUT</Text>
          <Text style={styles.paragraph}>{profile.introductionBio}</Text>
          {profileData.bio && profileData.bio !== profile.introductionBio && (
            <Text style={styles.paragraph}>{profileData.bio}</Text>
          )}
        </View>

        {/* ACHIEVEMENTS / KEY HIGHLIGHTS (if available) */}
        {achievements.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.sectionTitle}>KEY ACHIEVEMENTS</Text>
            {renderBullets(achievements)}
          </View>
        )}

        {/* TECHNICAL SKILLS */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>

          {skillsCategories ? (
            // Render categorized skills
            Object.entries(skillsCategories).map(([category, skills]: [string, any]) => (
              <View key={category} style={{ marginBottom: 6 }}>
                <Text style={styles.skillCategory}>{category}:</Text>
                <Text style={styles.skillList}>
                  {Array.isArray(skills) ? skills.join(' • ') : skills}
                </Text>
              </View>
            ))
          ) : (
            // Fall back to flat list
            <Text style={styles.skillList}>
              {flatSkills.join(' • ')}
            </Text>
          )}
        </View>

        {/* WORK EXPERIENCE */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>

          {profile.experience.map((exp: any, expIdx: number) => (
            <View key={`exp-${expIdx}`} style={{ marginBottom: 12 }}>
              {/* Company Header */}
              <View style={styles.companyHeader}>
                <Text style={styles.companyName}>{exp.title}</Text>
                <Text style={styles.dateRange}>
                  {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                </Text>
              </View>

              {/* Location and Work Type (if available) */}
              {(exp.location || exp.workType) && (
                <Text style={styles.location}>
                  {exp.location}
                  {exp.location && exp.workType && ' · '}
                  {exp.workType}
                </Text>
              )}

              {/* Roles within company */}
              {exp.children && exp.children.length > 0 ? (
                exp.children.map((role: any, roleIdx: number) => (
                  <View key={`role-${roleIdx}`} style={{ marginTop: 8 }}>
                    <View style={styles.roleHeader}>
                      <Text style={styles.roleTitle}>{role.title}</Text>
                      <Text style={styles.dateRange}>
                        {formatDate(role.startDate)} –{' '}
                        {formatDate(role.endDate)}
                      </Text>
                    </View>

                    {/* Technologies used in this role */}
                    {role.technologies && role.technologies.length > 0 && (
                      <Text style={styles.technologies}>
                        Technologies: {role.technologies.join(', ')}
                      </Text>
                    )}

                    {/* Role achievements or description as bullets */}
                    {role.achievements && role.achievements.length > 0 ? (
                      renderBullets(role.achievements)
                    ) : role.description ? (
                      renderBullets(formatBulletPoints(role.description))
                    ) : null}
                  </View>
                ))
              ) : (
                // Single role (no children)
                <>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <Text style={styles.technologies}>
                      Technologies: {exp.technologies.join(', ')}
                    </Text>
                  )}
                  {exp.description && renderBullets(formatBulletPoints(exp.description))}
                </>
              )}
            </View>
          ))}
        </View>

        {/* EDUCATION */}
        <View style={styles.block}>
          <Text style={styles.sectionTitle}>EDUCATION</Text>

          {profile.education.map((edu: any, eduIdx: number) => (
            <View key={`edu-${eduIdx}`} style={styles.educationItem}>
              <Text style={styles.educationTitle}>{edu.title}</Text>
              <Text style={styles.educationDetails}>
                {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
              </Text>
              {edu.subtitle && (
                <Text style={styles.educationDetails}>{edu.subtitle}</Text>
              )}

              {/* Nested education items (if any) */}
              {edu.children &&
                edu.children.map((child: any, childIdx: number) => (
                  <Text key={childIdx} style={styles.educationDetails}>
                    {child.title} ({formatDate(child.startDate)} –{' '}
                    {formatDate(child.endDate)})
                  </Text>
                ))}
            </View>
          ))}
        </View>

        {/* CERTIFICATIONS (if available) */}
        {certifications.length > 0 && (
          <View style={styles.block}>
            <Text style={styles.sectionTitle}>CERTIFICATIONS</Text>

            {certifications.map((cert: any, certIdx: number) => (
              <View key={`cert-${certIdx}`} style={styles.certificationItem}>
                <Text style={styles.certificationText}>
                  • <Text style={{ fontWeight: 'bold' }}>{cert.name}</Text>
                  {cert.platform && (
                    <Text style={{ fontStyle: 'italic' }}> - {cert.platform}</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFDocument;
