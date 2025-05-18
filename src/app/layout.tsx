"use client";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    secondary: { main: "#263043" },
    background: { default: "#181c24", paper: "#232a36" },
    text: { primary: "#e3f2fd", secondary: "#b0bec5" },
    success: { main: "#388e3c" },
    error: { main: "#c62828" },
    info: { main: "#90caf9" },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: '"Roboto","Noto Sans JP",sans-serif',
    fontWeightBold: 800,
    h3: { fontWeight: 900, letterSpacing: 1.5 },
    h4: { fontWeight: 700 },
    h6: { fontWeight: 800 },
    subtitle1: { fontWeight: 800 },
    body2: { fontWeight: 700 },
    button: { fontWeight: 700 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 4, textTransform: "none" },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700 },
      },
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        style={{
          background: theme.palette.background.default,
          margin: 0,
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
