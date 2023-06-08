import express from "express";
import axios from "axios";
import fs from "fs";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
	try {
		const text = req.query.text.toString();

		let formData = new FormData();
		formData.append("locale", "hi-IN");
		formData.append(
			"content",
			`<voice name="hi-IN-MadhurNeural">${text ?? "My name is Ravi"}</voice>`
		);
		formData.append("ip", "2405:204:300e:4c03::b4c:e8a4");

		const x = await axios.post(
			"https://app.micmonster.com/restapi/create",
			formData
		);

		const buffer = Buffer.from(x.data, "base64");
		fs.writeFileSync("./audio.mp3", buffer);
		return res
			.status(200)
			.send(`wrote ${buffer.byteLength.toLocaleString()} bytes to file.`);
	} catch (error) {
		return res.status(400).send(error);
	}
});

app.listen(5000, () => console.log("SERVER: 5000"));
