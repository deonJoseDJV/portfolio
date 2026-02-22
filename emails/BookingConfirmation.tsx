import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Link,
  Section,
  Row,
  Column,
  Hr,
} from "@react-email/components";

interface BookingConfirmationEmailProps {
  name: string;
  email: string;
  date: string;
  time: string;
  meetingLink: string;
}

export const BookingConfirmationEmail = ({
  name,
  date,
  time,
  meetingLink,
}: BookingConfirmationEmailProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Html>
      <Head />
      <Preview>Your call with Deon Jose is confirmed! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Confirmed! ✅</Heading>
          
          <Text style={text}>Hi {name},</Text>
          
          <Text style={text}>
            Your call with <strong>Deon Jose</strong> has been successfully scheduled.
          </Text>

          <Section style={detailsSection}>
            <Heading as="h2" style={h2}>📅 Call Details</Heading>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Date:</Column>
              <Column style={detailValue}>{formattedDate}</Column>
            </Row>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Time:</Column>
              <Column style={detailValue}>{time} GMT+5:30</Column>
            </Row>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Duration:</Column>
              <Column style={detailValue}>30 minutes</Column>
            </Row>
            
            <Row style={detailRow}>
              <Column style={detailLabel}>Location:</Column>
              <Column style={detailValue}>Google Meet</Column>
            </Row>
          </Section>

          <Section style={meetingSection}>
            <Heading as="h2" style={h2}>🔗 Join Meeting</Heading>
            <Text style={text}>
              Click the button below to join the call at the scheduled time:
            </Text>
            <Link href={meetingLink} style={button}>
              Join Google Meet
            </Link>
            <Text style={fallbackLink}>
              If the button doesn't work, copy this link:{" "}
              <Link href={meetingLink} style={link}>
                {meetingLink}
              </Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Add this event to your calendar by clicking the Google Meet link above.
            <br />
            Need to reschedule? Reply to this email.
          </Text>

          <Text style={signature}>
            — Deon Jose
            <br />
            Fullstack Developer
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingConfirmationEmail;

// Styles
const main = {
  backgroundColor: "#0b0b0f",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#1A1A1A",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
};

const h1 = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "600",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const h2 = {
  color: "#ffffff",
  fontSize: "20px",
  fontWeight: "600",
  margin: "20px 0 10px",
};

const text = {
  color: "#e0e0e0",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "10px 0",
};

const detailsSection = {
  backgroundColor: "rgba(139, 92, 246, 0.1)",
  border: "1px solid rgba(139, 92, 246, 0.2)",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const meetingSection = {
  backgroundColor: "rgba(255,255,255,0.05)",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const detailRow = {
  margin: "8px 0",
};

const detailLabel = {
  color: "#9CA3AF",
  fontSize: "14px",
  width: "100px",
};

const detailValue = {
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "500" as const,
};

const button = {
  backgroundColor: "#8B5CF6",
  borderRadius: "8px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  margin: "20px 0 10px",
  padding: "12px 24px",
  textDecoration: "none",
  textAlign: "center" as const,
};

const fallbackLink = {
  color: "#9CA3AF",
  fontSize: "12px",
  margin: "10px 0",
};

const link = {
  color: "#8B5CF6",
  textDecoration: "underline",
};

const hr = {
  borderColor: "rgba(255,255,255,0.1)",
  margin: "30px 0",
};

const footer = {
  color: "#9CA3AF",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "20px 0",
};

const signature = {
  color: "#e0e0e0",
  fontSize: "14px",
  textAlign: "center" as const,
  margin: "20px 0 0",
};