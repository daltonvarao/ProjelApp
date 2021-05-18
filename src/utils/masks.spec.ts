import * as Masks from './masks';

// Masks.cpf(unmaskedDigitSequence: string): string => apply mask on a unmasked digit sequence
// Masks.cpfUnmask(maskedDigitSequence: string): string => removes mask from masked digit sequence

describe('CPF Masks', () => {
  it('should Mask.cpf() removes non numeric digits before apply mask', () => {
    const unmaskedCpfZero = '00.0';
    const maskedCpfZero = Masks.cpf(unmaskedCpfZero);
    expect(maskedCpfZero).toEqual('000');
  });

  const unmaskedCpfOne = '0000';
  const unmaskedCpfTwo = '0000000';
  const unmaskedCpfThree = '00000000000';

  const maskedCpfOne = Masks.cpf(unmaskedCpfOne);
  const maskedCpfTwo = Masks.cpf(unmaskedCpfTwo);
  const maskedCpfThree = Masks.cpf(unmaskedCpfThree);

  it('should Mask.cpf() apply mask on string digit sequence', () => {
    expect(maskedCpfOne).toEqual('000.0');
    expect(maskedCpfTwo).toEqual('000.000.0');
    expect(maskedCpfThree).toEqual('000.000.000-00');
  });

  const removedMaskCpfOne = Masks.cpfUnmask(maskedCpfOne);
  const removedMaskCpfTwo = Masks.cpfUnmask(maskedCpfTwo);
  const removedMaskCpfThree = Masks.cpfUnmask(maskedCpfThree);

  it('should Masks.cpfUnmask() remove mask from masked string digit sequence', () => {
    expect(removedMaskCpfOne).toEqual(unmaskedCpfOne);
    expect(removedMaskCpfTwo).toEqual(unmaskedCpfTwo);
    expect(removedMaskCpfThree).toEqual(unmaskedCpfThree);
  });
});
