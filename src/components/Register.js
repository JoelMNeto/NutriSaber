import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [ra, setRa] = useState('');
  const [series, setSeries] = useState('');
  const [periodos, setPeriodos] = useState('');
  const [alergenicos, setAlergenicos] = useState('');
  const [hobbys, setHobbys] = useState('');
  const [dificuldades, setDificuldades] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [error, setError] = useState('');

  const ALLERGEN_OPTIONS = ['Leite', 'Ovo', 'Amendoim', 'Glúten', 'Soja', 'Peixe', 'Frutos do mar', 'Nozes'];

  function toggleAllergen(item) {
    const parts = alergenicos.split(',').map(s => s.trim()).filter(Boolean);
    if (parts.includes(item)) {
      const next = parts.filter(p => p !== item);
      setAlergenicos(next.join(', '));
    } else {
      const next = [...parts, item];
      setAlergenicos(next.join(', '));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome || !ra) {
      setError('Nome e RA são obrigatórios.');
      return;
    }
    setError('');
    const payload = { nome, ra, series, periodos, alergenicos, hobbys, dificuldades, observacoes };
    console.log('Cadastro simulado:', payload);
    alert('Aluno cadastrado (simulado).');
    navigate('/');
  }

  return (
    <div className="register-wrapper">

      <form className="register-card" onSubmit={handleSubmit}>
        <Link to="/" className="back-button" aria-label="Voltar">
          <ArrowBackIcon className="back-icon" fontSize="small" aria-hidden="true" />
        </Link>
        <h1 className="register-title">Cadastro de Aluno</h1>
        {error && <div className="register-error">{error}</div>}

        <label className="register-label">
          <span className="label-text">Nome do Aluno</span>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite o nome do aluno" className="register-input" />
        </label>

        <label className="register-label">
          <span className="label-text">RA</span>
          <input type="text" value={ra} onChange={e => setRa(e.target.value)} placeholder="Digite o RA do aluno" className="register-input" />
        </label>

        <label className="register-label">
          <span className="label-text">Serie e Periodo</span>
          <select value={series} onChange={e => setSeries(e.target.value)} className="register-select">
            <option value="">Escolha a série</option>
            <option>1º A</option>
            <option>1º B</option>
            <option>2º A</option>
            <option>2º B</option>
            <option>3º A</option>
            <option>3º B</option>
            <option>4º A</option>
            <option>4º B</option>
            <option>5º A</option>
            <option>5º B</option>
          </select>

          <select value={periodos} onChange={e => setPeriodos(e.target.value)} className="register-select">
            <option value="">Escolha o período</option>
            <option>Manha</option>
            <option>Tarde</option>
          </select>
        </label>

        <label className="register-label">
          <span className="label-text">Alergênicos</span>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            <input type="text" value={alergenicos} onChange={e => setAlergenicos(e.target.value)} placeholder="Digite as substâncias que o aluno tem alergia" className="register-input" />
            <div className="options-row">
              {ALLERGEN_OPTIONS.map(opt => {
                const selected = alergenicos.split(',').map(s => s.trim()).filter(Boolean).includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    className={`option ${selected ? 'selected' : ''}`}
                    onClick={() => toggleAllergen(opt)}
                    aria-pressed={selected}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </label>

        <label className="register-label">
          <span className="label-text">Hobbys</span>
          <input type="text" value={hobbys} onChange={e => setHobbys(e.target.value)} placeholder="Digite os hobbys do aluno" className="register-input" />
        </label>

        <label className="register-label">
          <span className="label-text">Dificuldades</span>
          <textarea value={dificuldades} onChange={e => setDificuldades(e.target.value)} placeholder="Adicione pontos que precisam ser trabalhados." className="register-textarea" />
        </label>

        <label className="register-label">
          <span className="label-text">Observações</span>
          <textarea value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Digite informações que são importantes compartilhar com a escola." className="register-textarea" />
        </label>

        <button type="submit" className="register-button">Cadastrar Aluno</button>
      </form>
    </div>
  );
}

export default Register;
