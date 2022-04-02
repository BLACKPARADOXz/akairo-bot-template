# Discord-Akairo Bot Taslağı
Discord-akairo modülü kullanılarak yapılan, discord botu yapmak isteyenler için mükemmel boş bir taslak

[Novachrono](https://github.com/BLACKPARADOXz) tarafından yapıldı.

## Bot komutları
Bu şablonda şu komutlar mevcuttur:

#Normal komutlar
- ping

#Slash komutlar
- test

Burda gördüğünüz taslağı kullanarak kendiniz komut ekleyebilirsiniz:

```
const { Command } = require('discord-akairo');

export default class Komut_Adı extends Command {
    public constructor() {
        super('Komut_Adı', {
            aliases: ['Gerçek_Komut_Adı']
        });
    }

    async exec(message) {
        // Kod
    }
}
```

## Botu kurarken
1. [Node'yi yükleyin](https://nodejs.org/en/download/)
2. ``ayarlar.yaml`` dosyasını bir metin düzenleyicide açın ve gerekli değerleri doldurun.
3. Botu sunucuya davet edin.
4. Botun ``Mesajları yönet``, ``Kanalları yönet`` yetkilerine sahip olduğunu kontrol edin. 
5. ``başlat.bat`` dosyasını açarak botu başlatın!

## Destek sunucusu
Botu kurma konusunda yardıma ihtiyacınız varsa veya bununla ilgili başka şeyler konuşmak istiyorsanız, Discord'daki destek sunucumuza buradan katılın:

👉 **[Destek sunucusuna katılın](https://discord.gg/mGn7gfMbk5)**
