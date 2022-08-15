# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Sırasıyla ilk 4 komut çalıştırıldığında hardhat 20 tane içinde 10000 ETH dolu hesap verir, belirlediğimiz scriptler çalışır ve react ile yazılan frontend çalışır.
Her komut farklı terminalde çalışmalıdır.

```shell
npx hardhat node

npx hardhat run scripts/deployTest1.ts

cd frontend
npm start
```

Aşağıdaki komut çalıştırıldığında fonksiyonlar için yazdığımız testler çalışır.

```shell
npx hardhat test /test/Test2.ts
```
