"use client";

import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  colorSchemes: { dark: true },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Box sx={{ minHeight: "100vh", bgcolor: "#181c24", py: 4 }}>
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
