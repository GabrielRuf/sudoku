const express = require('express');
const cors = require('cors');
const { generateSudoku } = require('./sudokuGenerator');
const verifyToken = require('./verifyToken');
const authRoutes = require('./authRoutes');  // Importe as rotas de autenticação

const app = express();
const port = process.env.PORT || 3001;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  
}));

app.use(cors());
app.use(express.json());

// Usar as rotas de autenticação
app.use('/auth', authRoutes);

app.get('/sudoku', verifyToken, (req, res) => {
  const sudoku = generateSudoku();
  res.json(sudoku);
});

app.get('/verify-token', verifyToken, (req, res) => {
  res.status(200).json({ message: "Token is valid" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
