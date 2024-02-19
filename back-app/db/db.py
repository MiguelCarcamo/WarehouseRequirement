import asyncio
import aioodbc

# con esta clase nos permite realizar las conexiones de forma asincrona con los servidores requeridos
class conn: 
    async def runServer(text):
        conn = None
        cur = None 
        try:
            loop = asyncio.get_event_loop()
            dsn = r''
            conn = await aioodbc.connect(dsn=dsn, loop=loop)
            cur = await conn.cursor()
            await cur.execute(text)
            rows = await cur.fetchall()
            dic = [dict(line) for line in [zip([ column[0] for column in cur.description], row) for row in rows]]
            return dic
        except Exception as ex:
            print(ex)
            return 0
        finally:
            if cur is not None:
                await cur.close()
            if conn is not None:
                await conn.close()

    async def runServer2(text):
        conn = None
        cur = None        
        try:
            loop = asyncio.get_event_loop()
            dsn = r''
            conn = await aioodbc.connect(dsn=dsn, loop=loop)
            cur = await conn.cursor()
            await cur.execute(text)
            rows = await cur.commit()
            return 1
        except Exception as ex:
            print(ex)
            return 0
        finally:
            if cur is not None:
                await cur.close()
            if conn is not None:
                await conn.close()
    
    async def runServer3(text):
        conn = None
        cur = None
        try:
            loop = asyncio.get_event_loop()
            dsn = r''
            conn = await aioodbc.connect(dsn=dsn, loop=loop)
            cur = await conn.cursor()
            await cur.execute(text)
            rows = await cur.fetchall()
            dic = [dict(line) for line in [zip([column[0] for column in cur.description], row) for row in rows]]
            return dic
        except Exception as ex:
            print(ex)
            return 0
        finally:
            if cur is not None:
                await cur.close()
            if conn is not None:
                await conn.close()
