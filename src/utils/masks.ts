export function cpf(cpfNumber: string) {
  let newcpf = cpfUnmask(cpfNumber);

  if (newcpf.length > 9 && newcpf.length <= 11) {
    newcpf = newcpf.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
  }

  if (newcpf.length > 6 && newcpf.length <= 9) {
    newcpf = newcpf.replace(/(\d{3})(\d{3})(\d)/, '$1.$2.$3');
  }

  if (newcpf.length <= 6) {
    newcpf = newcpf.replace(/(\d{3})(\d)/, '$1.$2');
  }

  return newcpf;
}

export function cpfUnmask(cpfNumber: string) {
  let newcpf = cpfNumber.replace(/\D/g, '');

  return newcpf;
}
