import { mock, MockProxy } from 'jest-mock-extended'
import { CheckAccountByUsernameRepository } from '@/domain/contracts/repositories'
import { AddAccount } from '@/domain/usecases'

describe('AddAccount Usecase', () => {
  const fakeAccount = {
    username: 'any_username',
    firstName: 'any_firstname',
    lastName: 'any_lastName',
    password: 'any_password',
    passwordConfirmation: 'any_password',
    email: 'any_email'
  }

  let accountRepository: MockProxy<CheckAccountByUsernameRepository>
  let sut: AddAccount

  beforeAll(() => {
    console.log('test')
    accountRepository = mock<CheckAccountByUsernameRepository>()
  })

  beforeEach(() => {
    sut = new AddAccount(accountRepository)
  })

  it('should call CheckAccountByUsernameRepository with correct input', async () => {
    await sut.add(fakeAccount)

    expect(accountRepository.checkByUsername).toHaveBeenCalledWith({
      username: fakeAccount.username
    })
    expect(accountRepository.checkByUsername).toHaveBeenCalledTimes(1)
  })
})
